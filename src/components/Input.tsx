import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      className,
      onFocus,
      onBlur,
      onChange,
      maxLength,
      placeholder,
      ..._inputAttributes
    }: InputHTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
        type='text'
        placeholder='검색어 입력'
        className='flex-1 border border-gray-300 focus:border-green-500 caret-green-500 rounded-md py-12pxr px-18pxr'
        {..._inputAttributes}
      />
    );
  }
);

export default Input;
