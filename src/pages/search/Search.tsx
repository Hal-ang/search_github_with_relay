import React, { useMemo, useState, useTransition } from 'react';

import { MutatingDots } from 'react-loader-spinner';
import { SearchRepositoryQuery } from '../../graphql/queries/search';
import type { searchRepositoryQuery } from '../../graphql/queries/__generated__/searchRepositoryQuery.graphql';
import starIcon from '../../assets/star.svg';
import { useLazyLoadQuery } from 'react-relay';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const [query, setQuery] = useState('');
  const [after, setAfter] = useState(null);

  const [isPending, startTransition] = useTransition();

  const searchedData = useLazyLoadQuery<searchRepositoryQuery>(
    SearchRepositoryQuery,
    { query, after }
  );

  const searchList = useMemo(
    () => searchedData?.search?.edges ?? [],
    [searchedData]
  );
  const { hasNextPage, endCursor } = useMemo(
    () => searchedData?.search?.pageInfo,
    [searchedData]
  );

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
            startTransition(() => {
              setQuery(inputValue);
            });
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
        {isPending ? (
          <div className='flex flex-col justify-center items-center mt-50pxr'>
            <MutatingDots
              height='100'
              width='100'
              color='#4fa94d'
              secondaryColor='#4fa94d'
              radius='12.5'
              ariaLabel='mutating-dots-loading'
              visible
            />
            <p className='mt-30pxr text-13pxr font-bold text-gray-600'>
              열심히 검색 중입니다...
            </p>
          </div>
        ) : isSearched ? (
          searchList.map((item) => (
            <div
              key={`${item?.node?.id}-${item?.node?.stargazers?.totalCount}`}
              className='w-full flex flex-col items-start px-16pxr py-8pxr bg-white mt-10pxr rounded-md border border-gray-200'
            >
              <a
                target='_blank'
                href={item?.node?.url}
                className='font-bold text-20pxr hover:underline'
              >
                {item?.node?.name}
              </a>
              <p className='text-gray-500 text-15pxr line-clamp-2'>
                {item?.node?.description}
              </p>
              <button
                onClick={() => console.log('click star button')}
                className={`mt-5pxr flex flew-row item-center py-5pxr px-8pxr rounded-md hover:bg-green-100 border ${
                  item?.node?.viewerHasStarred
                    ? 'bg-green-50 border-green-400'
                    : 'bg-white border-gray-200'
                }`}
              >
                <img
                  src={starIcon}
                  alt='github-star-svg'
                  width={16}
                  height={16}
                  className='mr-4pxr self-center '
                />
                <span className='text-15pxr text-gray-500'>
                  {item?.node?.stargazers?.totalCount.toLocaleString()}
                </span>
              </button>
            </div>
          ))
        ) : null}
      </section>
    </main>
  );
};
export default Search;
