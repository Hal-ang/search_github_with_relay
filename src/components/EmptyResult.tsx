import React from 'react';

const EmptyResult = React.memo(() => {
  return (
    <div className='w-full text-center text-white'>
      검색 결과가 없습니다!! 😅
    </div>
  );
});

export default EmptyResult;
