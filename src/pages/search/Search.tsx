import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';

import { SearchEdgeType } from '../../types/search';
import SearchItem from '../../components/SearchItem';
import { SearchRepositoryQuery } from '../../graphql/queries/search';
import Spinner from '../../components/Spinner';
import type { searchRepositoryQuery } from '../../graphql/queries/__generated__/searchRepositoryQuery.graphql';
import { useLazyLoadQuery } from 'react-relay';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const [query, setQuery] = useState<string>('');
  const [after, setAfter] = useState<string | null>(null);

  const [isPendingQueryResult, startTransitionQuery] = useTransition();
  const [isPendingAfter, startTransitionAfter] = useTransition();

  const [searchList, setSearchList] = useState<SearchEdgeType[]>([]);

  const searchedData = useLazyLoadQuery<searchRepositoryQuery>(
    SearchRepositoryQuery,
    { query, after }
  );

  useEffect(() => {
    if (!searchedData) return;

    setSearchList((prev) => [...prev, ...(searchedData?.search?.edges ?? [])]);
  }, [searchedData]);

  const { hasNextPage, endCursor } = useMemo(
    () => searchedData?.search?.pageInfo,
    [searchedData]
  );

  const footerRef = useRef<HTMLDivElement | null>(null);

  const observer = useMemo(
    () =>
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (isPendingQueryResult || !endCursor || !hasNextPage) return;

          startTransitionAfter(() => {
            setAfter(endCursor);
            observer.disconnect();
          });
        });
      }),
    [isPendingQueryResult, isPendingAfter, hasNextPage]
  );

  useEffect(() => {
    if (!footerRef.current) return;

    observer.observe(footerRef.current);
  }, [endCursor]);

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
            e.preventDefault();
            setIsSearched(true);

            if (query !== inputValue) {
              startTransitionQuery(() => {
                setQuery(inputValue);
              });
            }
          }}
        >
          <input
            type='text'
            placeholder='검색어 입력'
            value={inputValue}
            className={`flex-1 border border-gray-300 focus:border-green-500 caret-green-500 rounded-md py-12pxr px-18pxr`}
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
          searchList.map((item) => {
            if (!item?.node) return null;
            const { node } = item;
            const { id, stargazers, viewerHasStarred } = node;

            return (
              <SearchItem
                key={`${id}-${stargazers?.totalCount}-${viewerHasStarred}`}
                item={node}
              />
            );
          })
        ) : null}
        {hasNextPage && !isPendingQueryResult && (
          <footer ref={footerRef} className='w-full pt-20pxr'>
            {isPendingAfter && <Spinner width='80' height='80' />}
          </footer>
        )}
      </section>
    </main>
  );
};
export default Search;
