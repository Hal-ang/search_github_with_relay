import React, { useState } from 'react';

import { SEARCH_LIST } from '../../mock/searchList';

const result = SEARCH_LIST.data.search.edges;

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [isFocuesd, setIsFocused] = useState(false);

  const [isSearched, setIsSearched] = useState(false);

  return (
    <main className='flex flex-col justify-center items-center'>
      <header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsSearched(true);
          }}
        >
          <input
            type='text'
            placeholder={isFocuesd ? '' : '검색어 입력'}
            value={inputValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`border border-gray-300 focus:border-green-500 caret-green-500 rounded-md py-12pxr px-18pxr`}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          />
          <input
            type='submit'
            value='검색'
            className='ml-5pxr py-12pxr px-16pxr rounded-md bg-green-500 text-white hover:bg-green-600 cursor-pointer'
          />
        </form>
      </header>
      <section>
        {result.map((item) => (
          <>
            <div>{item.node.name}</div>
            <div>{item.node.description}</div>
            <div>{item.node.stargazers.totalCount}</div>
          </>
        ))}
      </section>
    </main>
  );
};

export default Search;
