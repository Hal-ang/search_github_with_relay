import graphql from 'babel-plugin-relay/macro';

export const SearchRepositoryQuery = graphql`
  query searchRepositoryQuery($query: String!, $after: String) {
    search(query: $query, first: 10, after: $after, type: REPOSITORY) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ... on Repository {
            id
            name
            url
            description
            viewerHasStarred
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }
`;
