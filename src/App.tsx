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
import OrganizationLayout, {Loader as OrganizationLoader} from 'components/orgs/orgId/OrganizationLayout';
import AppLayout from 'components/AppLayout';


function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
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
                  loader: OrganizationLoader
                }
              ]
            }
          ]
        }
      ]
    }
  ])

  return <RouterProvider router={routes} />
  // return (
  //   <>
  //   <BrowserRouter>
  //     <AxiosInstanceProvider config={{ baseURL: process.env.BACKEND_URL || "http://localhost:8080/" }}>
  //       <QueryClientProvider client={queryClient}>
  //         <CurrentUserContextProvider>
  //           <Routes>
  //             <Route path='/' element={<AppLayout />}>
  //               <Route index element={<LandingPage />} />
  //               <Route path='auth' element={<AuthPage />}>
  //                 <Route path='sign-in' element={<SignInPage />} />
  //                 <Route path='sign-up' element={<SignUpPage />} />
  //                 <Route index element={<Navigate to="sign-in" replace />} />
  //               </Route>
  //               <Route element={<PrivateRoute />}>
  //                 <Route path='orgs'>
  //                   <Route index element={<ListOfOrganizationsPage />} />
  //                   <Route path=':orgId' element={<OrganizationLayout />} loader={OrganizationLoader}>
                      
  //                   </Route>
  //                 </Route>
  //               </Route>
  //             </Route>
  //           </Routes>
  //         </CurrentUserContextProvider>
  //       </QueryClientProvider>
  //     </AxiosInstanceProvider>
  //   </BrowserRouter>
  //   </>
  // );
}

export default App;
