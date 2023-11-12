import { graphql } from 'relay-runtime';

export const SearchRepositoryQuery = graphql`
  query searchRepositoryQuery($query: String!, $first: Int, $after: String) {
    search(query: $query, first: $first, after: $after, type: REPOSITORY) {
      edges {
        cursor
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
