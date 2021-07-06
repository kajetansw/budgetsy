import { resolver, SecurePassword, hash256 } from 'blitz';
import db from 'db';
import { ResetPassword } from '../validations';
import login from './login';
import { gql } from 'graphql-request';

export class ResetPasswordError extends Error {
  name = 'ResetPasswordError';
  message = 'Reset password link is invalid or it has expired.';
}

export default resolver.pipe(resolver.zod(ResetPassword), async ({ password, token }, ctx) => {
  // 1. Try to find this token in the database
  const hashedToken = hash256(token);
  const { possibleToken } = await db.request(
    gql`
      query findTokenByTypeAndHashedToken($type: String!, $hashedToken: String!) {
        possibleToken: findTokenByTypeAndHashedToken(type: $type, hashedToken: $hashedToken) {
          id: _id
          expiresAt
          user {
            id: _id
            email
            role
          }
        }
      }
    `,
    { hashedToken, type: 'RESET_PASSWORD' }
  );

  // 2. If token not found, error
  if (!possibleToken) {
    throw new ResetPasswordError();
  }
  const savedToken = possibleToken;

  // 3. Delete token so it can't be used again
  await db.request(
    gql`
      mutation deleteToken($id: ID!) {
        deleteToken(id: $id) {
          id: _id
        }
      }
    `,
    { id: savedToken.id }
  );

  // 4. If token has expired, error
  if (savedToken.expiresAt < new Date()) {
    throw new ResetPasswordError();
  }

  // 5. Since token is valid, now we can update the user's password
  const hashedPassword = await SecurePassword.hash(password.trim());
  const { user } = await db.request(
    gql`
      mutation UpdateUser($id: ID!, $data: UserInput!) {
        updateUser(id: $id, data: $data) {
          id: _id
          email
        }
      }
    `,
    {
      id: savedToken.user.id,
      data: {
        hashedPassword,
        email: savedToken.user.email,
        role: savedToken.user.role,
      },
    }
  );

  // 6. Revoke all existing login sessions for this user
  await db.request(
    gql`
      mutation deleteSessionsByUserId($userId: ID!) {
        deleteSessionsByUserId(userId: $userId) {
          expiresAt
        }
      }
    `,
    {
      userId: savedToken.user.id,
    }
  );

  // 7. Now log the user in with the new credentials
  await login({ email: savedToken.user.email, password }, ctx);

  return true;
});
