import React, { useCallback, useState, useTransition } from 'react';

import Input from '../../components/Input';
import SearchList from '../../components/SearchList';
import { SearchParentComponentQuery } from './__generated__/SearchParentComponentQuery.graphql';
import Spinner from '../../components/Spinner';
import Submit from '../../components/Submit';
import graphql from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [query, setQuery] = useState<string>('');
  const [isPendingQueryResult, startTransitionQuery] = useTransition();

  const queryData = useLazyLoadQuery<SearchParentComponentQuery>(
    graphql`
      query SearchParentComponentQuery(
        $query: String!
        $after: String
        $first: Int
      ) {
        ...SearchListComponent_query
          @arguments(query: $query, after: $after, first: $first)
      }
    `,
    { after: null, query, first: 10 }
  );

  const resetAndInitiateSearch = useCallback(() => {
    if (query === inputValue) return;

    startTransitionQuery(() => {
      setQuery(inputValue);
    });
  }, [query, inputValue]);

  return (
    <main
      className={`flex flex-col items-center px-16pxr bg-green-50 ${
        !isSearched ? 'justify-center' : 'justify-start'
      }`}
    >
      <header className='sticky top-0 bg-green-50 w-full py-20pxr flex justify-center'>
        <form
          className='flex w-full'
          onSubmit={(e) => {
            if (isPendingQueryResult) return;
            e.preventDefault();
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
      </header>
      <section className={`w-full mt-30pxr pb-50pxr ${isSearched && 'h-full'}`}>
        {isPendingQueryResult ? (
          <Spinner className='mt-50pxr' text='열심히 검색 중입니다...' />
        ) : isSearched ? (
          <SearchList data={queryData} />
        ) : null}
      </section>
    </main>
  );
};

export default Search;
