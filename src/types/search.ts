import { searchRepositoryQuery$data } from '../graphql/queries/__generated__/searchRepositoryQuery.graphql';

export type SearchEdgeType = Exclude<
  searchRepositoryQuery$data['search']['edges'],
  null | undefined
>[0];

export type SearchNodeType = Exclude<
  Exclude<SearchEdgeType, null | undefined>['node'],
  null | undefined
>;
