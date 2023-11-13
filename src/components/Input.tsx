import React from 'react';

const Input = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type='text'
      placeholder='검색어 입력'
      value={value}
      className='flex-1 border border-gray-300 focus:border-green-500 caret-green-500 rounded-md py-12pxr px-18pxr'
      onChange={onChange}
    />
  );
};

export default Input;
