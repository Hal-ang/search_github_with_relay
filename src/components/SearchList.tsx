import {
  FragmentRef,
  useLazyLoadQuery,
  usePaginationFragment,
} from 'react-relay';
import React, { useEffect, useMemo, useRef } from 'react';

import SearchItem from './SearchItem';
import { SearchListComponent_query$key } from './__generated__/SearchListComponent_query.graphql';
import Spinner from './Spinner';
import graphql from 'babel-plugin-relay/macro';

const SearchList = (props: { data: SearchListComponent_query$key }) => {
  const {
    data,
    loadNext,
    loadPrevious,
    hasPrevious,
    isLoadingNext,
    isLoadingPrevious,
    refetch,
  } = usePaginationFragment(
    graphql`
      fragment SearchListComponent_query on Query
      @argumentDefinitions(
        first: { type: "Int" }
        after: { type: "String" }
        query: { type: "String!" }
      )
      @refetchable(queryName: "SearchListPaginationQuery") {
        search(first: $first, after: $after, query: $query, type: REPOSITORY)
          @connection(key: "Query_search") {
          pageInfo {
            endCursor
            hasNextPage
          }
          edges {
            node {
              ...SearchItem_repository
            }
          }
        }
      }
    `,
    props.data
  );

  const edges = useMemo(() => data.search.edges ?? [], [data]);
  const footerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      {edges.map((item) => {
        if (!item?.node) return null;
        const { node } = item;

        return <SearchItem data={node} />;
      })}
      {/* {hasNextPage && !isPendingQueryResult && ( */}
      <footer ref={footerRef} className='w-full pt-20pxr'>
        <Spinner width='80' height='80' />
      </footer>
      {/* )} */}
    </div>
  );
};

export default SearchList;
