import React, { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';
import ErrorPage from './pages/error/ErrorPage';
import Main from './pages/Main';
import ReactDOM from 'react-dom/client';
import { RelayEnvironment } from './RelayEnvironment';
import { RelayEnvironmentProvider } from 'react-relay';
import Search from './pages/search/Search';
import Spinner from './components/Spinner';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      { path: 'search', element: <Search /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <React.StrictMode>
      <Suspense
        fallback={
          <Spinner
            className='w-full h-screen bg-green-50'
            text='불러오는 중입니다..'
          />
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </React.StrictMode>
  </RelayEnvironmentProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
