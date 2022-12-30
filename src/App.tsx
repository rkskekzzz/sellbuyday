import * as React from 'react';
import { useReducer, createContext, Dispatch } from 'react';
import { Error, Home, Sign } from './components';
import { Analytics } from '@vercel/analytics/react';

import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

type State = {
  id: string;
};

const ProtectedRoute = () => {
  const id = window.localStorage.getItem('id');
  // dev mode
  if (!id || id === '') {
    return <Navigate to={'/sign'} replace />;
  }
  return <Outlet />;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/sign' element={<Sign />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route path='/404' element={<Error />} />
          <Route path='*' element={<Navigate to='/404' />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </>
  );
}
export default App;
