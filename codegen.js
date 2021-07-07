module.exports = {
  schema: [
    {
      'https://graphql.eu.fauna.com/graphql': {
        headers: {
          Authorization: 'Bearer ' + process.env.FAUNA_SECRET,
        },
      },
    },
  ],
  overwrite: true,
  generates: {
    './db/graphql-types.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },
};
