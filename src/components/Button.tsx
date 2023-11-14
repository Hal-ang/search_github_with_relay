import React, { useMemo } from 'react';

import { ButtonSize } from '../constants';

const Button = ({
  selected = false,
  text,
  LeftIcon,
  onClick,
  size,
  className = '',
}: {
  selected?: boolean;
  text: string;
  LeftIcon?: JSX.Element;
  onClick: () => void;
  size: ButtonSize;
  className?: string;
}) => {
  const sizeClassName = useMemo(
    () => ({
      wrapper:
        size === ButtonSize.Small ? 'py-5pxr px-8pxr' : 'py-12pxr px-16pxr',
      text: size === ButtonSize.Small ? 'text-15pxr' : 'text-25pxr',
    }),
    [size]
  );

  return (
    <button
      onClick={onClick}
      className={`mt-5pxr flex flew-row item-center rounded-md hover:bg-green-100 border ${
        selected ? 'bg-green-50 border-green-400' : 'bg-white border-gray-200'
      } ${sizeClassName.wrapper} ${className}`}
    >
      {LeftIcon}
      <span className={`text-gray-500 ${sizeClassName.text}`}>{text}</span>
    </button>
  );
};

export default Button;
