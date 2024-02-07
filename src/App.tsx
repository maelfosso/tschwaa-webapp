import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import './App.css';
import LandingPage from 'pages/LandingPage';
import SignInPage from 'pages/auth/SignInPage';
import AuthPage from 'pages/auth';
import SignUpPage from 'pages/auth/SignUpPage';
import CurrentUserContextProvider from 'contexts/CurrentUserContext';
import { AxiosInstanceProvider } from 'contexts/AxiosContext';
import ListOfOrganizationsPage from 'pages/orgs/ListOfOrganizationsPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PrivateRoute from 'components/common/PrivateRoute';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    }
  }
});

function App() {

  return (
    <>
    <BrowserRouter>
      <AxiosInstanceProvider config={{ baseURL: process.env.BACKEND_URL || "http://localhost:8080/" }}>
        <QueryClientProvider client={queryClient}>
          <CurrentUserContextProvider>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/auth/*' element={<AuthPage />}>
                <Route path='sign-in' element={<SignInPage />} />
                <Route path='sign-up' element={<SignUpPage />} />
              </Route>
              <Route path='/' element={<PrivateRoute />}>
                <Route path='/orgs' element={<ListOfOrganizationsPage />} />
              </Route>
            </Routes>
          </CurrentUserContextProvider>
        </QueryClientProvider>
      </AxiosInstanceProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
