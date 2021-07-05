import { Ctx } from 'blitz';
import { Login, LoginType } from '../validations';
import { authenticateUser } from '../auth-utils';

export default async function login(input: LoginType, { session }: Ctx) {
  // This throws an error if input is invalid
  const { email, password } = Login.parse(input);

  // This throws an error if credentials are invalid
  const user = await authenticateUser(email, password);

  await session.$create({ userId: user.id, role: 'USER' });

  return user;
}
