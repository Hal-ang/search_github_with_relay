import { useCallback, useMemo } from 'react';
import { useFragment, useMutation } from 'react-relay';

import Button from './Button';
import { ButtonSize } from '../constants';
import { SearchItem_repository$key } from './__generated__/SearchItem_repository.graphql';
import graphql from 'babel-plugin-relay/macro';
import starIcon from '../assets/star.svg';

const SearchItemRepositoryFragment = graphql`
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
`;

const AddStarMutation = graphql`
  mutation SearchItemAddStarMutation($input: AddStarInput!) {
    addStar(input: $input) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;

const RemoveStarMutation = graphql`
  mutation SearchItemRemoveStarMutation($input: RemoveStarInput!) {
    removeStar(input: $input) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;

const SearchItem = (props: { repository: SearchItem_repository$key }) => {
  const repository = useFragment(
    SearchItemRepositoryFragment,
    props.repository
  );

  const { id, url, name, description, viewerHasStarred, stargazers } = useMemo(
    () => repository,
    [repository]
  );

  const [addStarMutation] = useMutation(AddStarMutation);
  const [removeStarMutation] = useMutation(RemoveStarMutation);

  const toggleStarOnRepository = useCallback(() => {
    const starMutation = viewerHasStarred
      ? removeStarMutation
      : addStarMutation;

    starMutation({
      variables: {
        input: {
          starrableId: id,
        },
      },
    });
  }, [viewerHasStarred, id, addStarMutation, removeStarMutation]);

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
      <Button
        selected={viewerHasStarred}
        onClick={toggleStarOnRepository}
        size={ButtonSize.Small}
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
