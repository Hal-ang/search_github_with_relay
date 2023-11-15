import { useCallback, useMemo } from 'react';
import { useFragment, useMutation } from 'react-relay';

import Button from './Button';
import { ButtonSize } from '../constants';
import { Oval } from 'react-loader-spinner';
import { SearchItem_repository$key } from '../graphql/__generated__/SearchItem_repository.graphql';
import graphql from 'babel-plugin-relay/macro';
import grayStarIcon from '../assets/gray_star.svg';
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

const SearchItem = (props: { item: SearchItem_repository$key }) => {
  const searchedRepoData = useFragment(
    SearchItemRepositoryFragment,
    props.item
  );

  const { id, url, name, description, viewerHasStarred, stargazers } = useMemo(
    () => searchedRepoData,
    [searchedRepoData]
  );

  const [addStarMutation, isAdding] = useMutation(AddStarMutation);
  const [removeStarMutation, isRemoving] = useMutation(RemoveStarMutation);
  const isLoading = useMemo(
    () => isAdding || isRemoving,
    [isAdding, isRemoving]
  );

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
        className='mt-5pxr'
        selected={viewerHasStarred}
        onClick={toggleStarOnRepository}
        size={ButtonSize.Small}
        LeftIcon={
          isLoading ? (
            <Oval
              height={16}
              width={16}
              color='#4fa94d'
              wrapperClass='mr-4pxr self-center'
              visible
              ariaLabel='oval-loading'
              secondaryColor='#4fa94d'
              strokeWidth={5}
              strokeWidthSecondary={5}
            />
          ) : (
            <img
              src={viewerHasStarred ? starIcon : grayStarIcon}
              alt='github-star-svg'
              width={16}
              height={16}
              className='mr-4pxr self-center'
            />
          )
        }
        text={stargazers?.totalCount?.toLocaleString() ?? ''}
      />
    </div>
  );
};

export default SearchItem;
