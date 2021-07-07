import { Ctx, SecurePassword } from 'blitz';
import db from 'db';
import { Signup, SignupType } from 'app/auth/validations';
import { gql } from 'graphql-request';
import { User } from '../../../db/graphql-types';

export default async function signup(input: SignupType, { session }: Ctx) {
  // This throws an error if input is invalid
  const { email, password } = Signup.parse(input);

  const hashedPassword = await SecurePassword.hash(password);
  const { user } = (await db.request(
    gql`
      mutation createUser($email: String!, $hashedPassword: String, $role: String!) {
        user: createUser(data: { email: $email, hashedPassword: $hashedPassword, role: $role }) {
          id: _id
          email
          name
          role
        }
      }
    `,
    { email: email.toLowerCase(), hashedPassword, role: 'user' }
  )) as { user: User };

  await session.$create({ userId: user._id, role: 'USER' });

  return user;
}
