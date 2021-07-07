import { resolver, generateToken, hash256 } from 'blitz';
import db from 'db';
import { forgotPasswordMailer } from 'mailers/forgotPasswordMailer';
import { ForgotPassword } from '../validations';
import { gql } from 'graphql-request';
import { Token, User } from '../../../db/graphql-types';

const RESET_PASSWORD_TOKEN_EXPIRATION_IN_HOURS = 4;

export default resolver.pipe(resolver.zod(ForgotPassword), async ({ email }) => {
  // 1. Get the user
  const { user } = (await db.request(
    gql`
      query getUser($email: String!) {
        user: findUserByEmail(email: $email) {
          _id
          email
          name
          role
          hashedPassword
        }
      }
    `,
    { email: email.toLowerCase() }
  )) as { user: User };

  // 2. Generate the token and expiration date.
  const token = generateToken();
  const hashedToken = hash256(token);
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + RESET_PASSWORD_TOKEN_EXPIRATION_IN_HOURS);

  // 3. If user with this email was found
  if (user) {
    // 4. Delete any existing password reset tokens
    const { tokenData } = (await db.request(
      gql`
        query findTokenByType($type: String!) {
          tokenData: findTokenByType(type: $type) {
            data {
              _id
              user {
                _id
              }
            }
          }
        }
      `,
      { type: 'RESET_PASSWORD' }
    )) as { tokenData: { data: Token[] } };
    const tokens = tokenData.data;
    const tokensForMe = tokens.filter((t) => t.user._id === user._id);
    await Promise.all([
      tokensForMe.map((t) =>
        db.request(
          gql`
            mutation deleteToken($id: ID!) {
              deleteToken(id: $id) {
                _id
              }
            }
          `,
          { id: t._id }
        )
      ),
    ]);

    // 5. Save this new token in the database.
    await db.request(
      gql`
        mutation createToken(
          $hashedToken: String!
          $type: String!
          $expiresAt: Time!
          $sentTo: String!
          $user: TokenUserRelation!
        ) {
          createToken(
            data: {
              hashedToken: $hashedToken
              type: $type
              expiresAt: $expiresAt
              sentTo: $sentTo
              user: $user
            }
          ) {
            _id
          }
        }
      `,
      {
        hashedToken,
        type: 'RESET_PASSWORD',
        expiresAt,
        sentTo: user.email,
        user: { connect: user._id },
      }
    );
    // 6. Send the email
    await forgotPasswordMailer({ to: user.email, token }).send();
  } else {
    // 7. If no user found wait the same time so attackers can't tell the difference
    await new Promise((resolve) => setTimeout(resolve, 750));
  }

  // 8. Return the same result whether a password reset email was sent or not
  return;
});
