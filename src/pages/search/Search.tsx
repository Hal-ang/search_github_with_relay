import React, { useState } from 'react';

import { SEARCH_LIST } from '../../mock/searchList';
import starIcon from '../../assets/star.svg';

const result = SEARCH_LIST.data.search.edges;
const Search = () => {
  const [inputValue, setInputValue] = useState('');

  const [isSearched, setIsSearched] = useState(false);

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
      <section className='mt-30pxr pb-50pxr'>
        {isSearched &&
          [
            ...result,
            ...result,
            ...result,
            ...result,
            ...result,
            ...result,
          ].map((item) => (
            <div className='flex flex-col items-start px-16pxr py-8pxr bg-white mt-10pxr rounded-md border border-gray-200'>
              <a
                target='_blank'
                href={item.node.url}
                className='font-bold text-20pxr hover:underline'
              >
                {item.node.name}
              </a>
              <p className='text-gray-500 text-15pxr line-clamp-2'>
                {item.node.description}
              </p>
              <button
                onClick={() => console.log('click star button')}
                className={`mt-5pxr flex flew-row item-center py-5pxr px-8pxr rounded-md hover:bg-green-100 border ${
                  item.node.viewerHasStarred
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
                  {item.node.stargazers.totalCount.toLocaleString()}
                </span>
              </button>
            </div>
          ))}
      </section>
    </main>
  );
};
export default Search;
