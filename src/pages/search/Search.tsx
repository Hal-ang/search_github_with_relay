import React, { useCallback, useState, useTransition } from 'react';

import Input from '../../components/Input';
import SearchList from '../../components/SearchList';
import { SearchQuery } from '../../graphql/__generated__/SearchQuery.graphql';
import Spinner from '../../components/Spinner';
import Submit from '../../components/Submit';
import graphql from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay';

const SearchPageQuery = graphql`
  query SearchQuery($query: String!, $first: Int) {
    ...SearchListComponent_query @arguments(query: $query, first: $first)
  }
`;

const Search = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const [isPendingQueryResult, startTransitionQuery] = useTransition();

  const searchedRepoList = useLazyLoadQuery<SearchQuery>(SearchPageQuery, {
    query,
    first: 10,
  });

  const resetAndInitiateSearch = useCallback(() => {
    if (query === inputValue) return;

    startTransitionQuery(() => {
      setQuery(inputValue);
    });
  }, [query, inputValue]);

  return (
    <main
      className={`flex flex-col items-center px-16pxr lg:px-100pxr bg-black ${
        !isSearched ? 'justify-center' : 'justify-start'
      }`}
    >
      <header className='sticky top-0 bg-black w-full py-40pxr flex flex-col justify-center'>
        <div>
          <form
            className='flex w-full'
            onSubmit={(e) => {
              e.preventDefault();
              if (isPendingQueryResult) return;
              setIsSearched(true);

              resetAndInitiateSearch();
            }}
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.currentTarget.value)}
            />
            <Submit className='ml-5pxr' />
          </form>
        </div>
      </header>
      <section className={`w-full mt-30pxr pb-50pxr ${isSearched && 'h-full'}`}>
        {isPendingQueryResult ? (
          <Spinner className='mt-50pxr' text='열심히 검색 중입니다...' />
        ) : isSearched ? (
          <SearchList list={searchedRepoList} />
        ) : null}
      </section>
    </main>
  );
};

export default Search;
