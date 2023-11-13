import { MutatingDots } from 'react-loader-spinner';
import React from 'react';

const Spinner = React.memo(
  ({
    width = '100',
    height = '100',
    text,
    className,
  }: {
    width?: string;
    height?: string;
    text?: string;
    className?: string;
  }) => (
    <div
      className={`flex flex-col justify-center items-center ${className || ''}`}
    >
      <MutatingDots
        width={width}
        height={height}
        color='#4fa94d'
        secondaryColor='#4fa94d'
        radius='12.5'
        ariaLabel='mutating-dots-loading'
        visible
      />
      {text && (
        <p className='mt-30pxr text-13pxr font-bold text-gray-600'>{text}</p>
      )}
    </div>
  )
);

export default Spinner;
