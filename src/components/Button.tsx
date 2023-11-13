import React from 'react';

const ButtonWithIcon = React.memo(
  ({
    selected,
    text,
    LeftIcon,
    onClick,
  }: {
    selected: boolean;
    text: string;
    LeftIcon: JSX.Element;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`mt-5pxr flex flew-row item-center py-5pxr px-8pxr rounded-md hover:bg-green-100 border ${
        selected ? 'bg-green-50 border-green-400' : 'bg-white border-gray-200'
      }`}
    >
      {LeftIcon}
      <span className='text-15pxr text-gray-500'>{text}</span>
    </button>
  )
);

export default ButtonWithIcon;
