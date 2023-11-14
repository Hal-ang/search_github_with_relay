import React, { useMemo } from 'react';
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

import Button from '../../components/Button';
import { ButtonSize } from '../../constants';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const isPageNotFound = useMemo(
    () => isRouteErrorResponse(error) && error.status === 404,
    [error]
  );

  return (
    <main className='bg-black flex flex-col justify-center items-center'>
      <img
        className='w-100pxr h-100pxr mb-20pxr'
        src='https://www.freeiconspng.com/thumbs/warning-icon-png/status-warning-icon-png-29.png'
        alt=''
      />
      {isPageNotFound ? (
        <h1 className='text-white text-40pxr font-bold'>404 Not Found</h1>
      ) : (
        <h1 className='text-white text-40pxr font-bold'>Error</h1>
      )}
      <Button
        className='mt-80pxr'
        size={ButtonSize.Large}
        text='메인으로'
        onClick={() => navigate('/')}
      />
    </main>
  );
};

export default ErrorPage;
