import React from 'react';

const Submit = ({ className }: { className: string }) => {
  return (
    <input
      type='submit'
      value='검색'
      className={`py-12pxr px-16pxr rounded-md bg-[#00E600] text-white hover:bg-green-600 cursor-pointer ${className}`}
    />
  );
};

export default Submit;
