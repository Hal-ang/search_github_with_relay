import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import EmptyResult from './EmptyResult';
import SearchItem from './SearchItem';
import { SearchListComponent_query$key } from './__generated__/SearchListComponent_query.graphql';
import Spinner from './Spinner';
import graphql from 'babel-plugin-relay/macro';
import { usePaginationFragment } from 'react-relay';

const SearchListComponentQuery = graphql`
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
        cursor
        node {
          ...SearchItem_repository
        }
      }
    }
  }
`;

const SearchList = (props: { data: SearchListComponent_query$key }) => {
  const bottomSpinnerRef = useRef<HTMLDivElement | null>(null);
  const {
    data: searchedData,
    loadNext,
    isLoadingNext,
    hasNext,
  } = usePaginationFragment(SearchListComponentQuery, props.data);

  const observerAndLoadMore: IntersectionObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !hasNext || isLoadingNext) return;

        observer.disconnect();
        loadNext(20);
      });
    },
    [hasNext, isLoadingNext]
  );

  const observer = useMemo(
    () => new IntersectionObserver(observerAndLoadMore),
    [observerAndLoadMore]
  );

  useEffect(() => {
    if (!bottomSpinnerRef.current) return;

    observer.observe(bottomSpinnerRef.current);
  }, [searchedData?.search?.edges]);

  const edges = useMemo(
    () => searchedData.search.edges ?? [],
    [searchedData.search.edges]
  );

  if (edges.length === 0) return <EmptyResult />;

  return (
    <>
      {edges.map((edge, index) => {
        if (!edge?.node) return null;
        return (
          <SearchItem key={`${edge.cursor}-${index}`} repository={edge.node} />
        );
      })}
      {hasNext && (
        <section ref={bottomSpinnerRef} className='w-full mt-20pxr h-full'>
          {isLoadingNext && <Spinner width='80' height='80' />}
        </section>
      )}
    </>
  );
};

export default SearchList;
