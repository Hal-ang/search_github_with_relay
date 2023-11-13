import './index.css';

import { Outlet } from 'react-router-dom';
import Spinner from './components/Spinner';
import { Suspense } from 'react';

function App() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default App;
