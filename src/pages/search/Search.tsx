import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';

import SearchList from '../../components/SearchList';
import { SearchParentComponentQuery } from './__generated__/SearchParentComponentQuery.graphql';
import Spinner from '../../components/Spinner';
import graphql from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const [query, setQuery] = useState<string>('');
  const [after, setAfter] = useState<string | null>(null);

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
      setAfter(null);
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
          <input
            type='text'
            placeholder='검색어 입력'
            value={inputValue}
            className='flex-1 border border-gray-300 focus:border-green-500 caret-green-500 rounded-md py-12pxr px-18pxr'
            onChange={(e) => setInputValue(e.currentTarget.value)}
          />
          <input
            type='submit'
            value='검색'
            className='ml-5pxr py-12pxr px-16pxr rounded-md bg-[#00E600] text-white hover:bg-green-600 cursor-pointer'
          />
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
