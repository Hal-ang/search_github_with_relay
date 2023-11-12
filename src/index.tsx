import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';
import Main from './pages/Main';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RelayEnvironment } from './RelayEnvironment';
import { RelayEnvironmentProvider } from 'react-relay';
import Search from './pages/search/Search';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
      <RouterProvider router={router} />
    </React.StrictMode>
  </RelayEnvironmentProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
