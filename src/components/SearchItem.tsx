import React, { useMemo } from 'react';

import ButtonWithIcon from './Button';
import { SearchItem_repository$key } from './__generated__/SearchItem_repository.graphql';
import graphql from 'babel-plugin-relay/macro';
import starIcon from '../assets/star.svg';
import { useFragment } from 'react-relay';

type Props = {
  data: SearchItem_repository$key;
};

const SearchItem = (props: Props) => {
  const data = useFragment(
    graphql`
      fragment SearchItem_repository on Repository {
        id
        name
        url
        description
        viewerHasStarred
        stargazers {
          totalCount
        }
      }
    `,
    props.data
  );

  const { url, name, description, viewerHasStarred, stargazers } = useMemo(
    () => data,
    [data]
  );

  return (
    <div className='w-full flex flex-col items-start px-16pxr py-8pxr bg-white mt-10pxr rounded-md border border-gray-200'>
      <a
        target='_blank'
        href={url}
        rel='noreferrer'
        className='font-bold text-20pxr hover:underline'
      >
        {name}
      </a>
      <p className='text-gray-500 text-15pxr line-clamp-2'>{description}</p>
      <ButtonWithIcon
        selected={viewerHasStarred ?? false}
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
        text={stargazers?.totalCount?.toString() ?? ''}
      />
    </div>
  );
};

export default SearchItem;
