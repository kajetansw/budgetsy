import { NotFoundError, SecurePassword, resolver } from 'blitz';
import db from 'db';
import { ChangePassword } from '../validations';
import { authenticateUser } from '../auth-utils';
import { gql } from 'graphql-request';
import { User } from '../../../db/graphql-types';

export default resolver.pipe(
  resolver.zod(ChangePassword),
  resolver.authorize(),
  async ({ currentPassword, newPassword }, ctx) => {
    // 1. Find user
    const { user } = (await db.request(
      gql`
        query getUser($id: ID!) {
          user: findUserByID(id: $id) {
            _id
            email
            name
            role
          }
        }
      `,
      { id: ctx.session.userId }
    )) as { user: Pick<User, '_id' | 'email' | 'name' | 'role'> };

    if (!user) throw new NotFoundError();

    // 2. Authenticate
    await authenticateUser(user.email, currentPassword);

    // 3. Create new password
    const hashedPassword = await SecurePassword.hash(newPassword.trim());

    // 4. Update user
    await db.request(
      gql`
        mutation UpdateUser($id: ID!, $data: UserInput!) {
          updateUser(id: $id, data: $data) {
            id: _id
            email
          }
        }
      `,
      {
        id: user._id,
        data: {
          hashedPassword,
          email: user.email,
          role: user.role,
        },
      }
    );

    return true;
  }
);
