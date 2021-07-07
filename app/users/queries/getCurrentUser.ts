import { Ctx } from 'blitz';
import db from 'db';
import { gql } from 'graphql-request';
import { User } from '../../../db/graphql-types';

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null;

  const { user } = await db.request(
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
    { id: session.userId }
  );

  return user as User;
}
