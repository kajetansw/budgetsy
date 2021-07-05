import { GraphQLClient } from 'graphql-request';

const graphQLClient = new GraphQLClient('https://graphql.eu.fauna.com/graphql', {
  headers: {
    authorization: 'Bearer ' + process.env.FAUNA_SECRET,
  },
});

export default graphQLClient;
