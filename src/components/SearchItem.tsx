import ButtonWithIcon from './Button';
import React from 'react';
import { SearchNodeType } from '../types/search';
import starIcon from '../assets/star.svg';

const SearchItem = React.memo(
  ({ item }: { item: SearchNodeType }) => (
    <div className='w-full flex flex-col items-start px-16pxr py-8pxr bg-white mt-10pxr rounded-md border border-gray-200'>
      <a
        target='_blank'
        href={item.url}
        rel='noreferrer'
        className='font-bold text-20pxr hover:underline'
      >
        {item.name}
      </a>
      <p className='text-gray-500 text-15pxr line-clamp-2'>
        {item.description}
      </p>
      <ButtonWithIcon
        selected={item.viewerHasStarred ?? false}
        onClick={() => console.log('click star button')}
        LeftIcon={
          <img
            src={starIcon}
            alt='github-star-svg'
            width={16}
            height={16}
            className='mr-4pxr self-center'
          />
        }
        text={item.stargazers?.totalCount?.toString() ?? ''}
      />
    </div>
  ),
  ({ item: prevItem }, { item: nextItem }) =>
    prevItem.id === nextItem.id &&
    prevItem.viewerHasStarred === nextItem.viewerHasStarred
);

export default SearchItem;
