import {
  Navigate,
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import './App.css';
import LandingPage from 'pages/LandingPage';
import SignInPage from 'pages/auth/SignInPage';
import AuthPage from 'pages/auth';
import SignUpPage from 'pages/auth/SignUpPage';
import ListOfOrganizationsPage from 'pages/orgs/ListOfOrganizationsPage';
import PrivateRoute from 'components/common/PrivateRoute';
import OrganizationLayout, { OrganizationLoader } from 'components/orgs/orgId/OrganizationLayout';
import AppLayout from 'components/AppLayout';
import { QueryClient } from '@tanstack/react-query';
import OrganizationDetailsPage from 'pages/orgs/OrganizationDetailsPage';
import NoSessionInProgress from 'pages/orgs/sessions/NoSessionInProgress';
import SetupNewSession from 'pages/orgs/sessions/SetupNewSession';
import CreateNewSession from 'pages/orgs/sessions/CreateNewSession';


function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
      mutations: {}
    }
  });

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout queryClient={queryClient}/>,
      children: [
        {
          index: true,
          element: <LandingPage />
        },
        {
          path: "auth",
          element: <AuthPage />,
          children: [
            {
              path: "sign-in",
              element: <SignInPage />
            },
            {
              path: "sign-up",
              element: <SignUpPage />
            },
            {
              index: true,
              element: <Navigate to="sign-in" replace />
            }
          ]
        },
        {
          element: <PrivateRoute />,
          children: [
            {
              path: "orgs",
              children: [
                {
                  index: true,
                  element: <ListOfOrganizationsPage />
                },
                {
                  path: ":orgId",
                  element: <OrganizationLayout />,
                  loader: OrganizationLoader(queryClient),
                  children: [
                    {
                      index: true,
                      element: <OrganizationDetailsPage />
                    },
                    // {
                    //   path: "home",
                    //   element: <OrganizationHomePage />
                    // },
                    // {
                    //   path: "members",
                    //   element: <OrganizationMembers />
                    // },
                    {
                      path: "no-session-in-progress",
                      element: <NoSessionInProgress />
                    },
                    {
                      path: "create-new-session",
                      element: <CreateNewSession />
                    },
                    {
                      path: "sessions",
                      children: [
                        // {
                        //   index: true,
                        //   element: <OrganizationSessions />
                        // },
                        {
                          path: ":sessionId",
                          // element: <SessionIdLayout />,
                          children: [
                            {
                              path: "setup",
                              element: <SetupNewSession />
                            },
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ])

  return <RouterProvider router={routes} />
}

export default App;
