import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import NavLayout from './layout/NavLayout'
import LandingPage from './pages/landing-page/LandingPage'
import SignIn from './pages/sign-in/SignIn';
import SignUp from "./pages/sign-up/SignUp";
import RequireAuth from './layout/RequireAuth';
import ProfilePage from './pages/profile-page/ProfilePage';
import UpdateProfile from './pages/update-profile/UpdateProfile';
import AddListings from './pages/add-listings/AddListings';
import Listings from './pages/listings/Listings';
import SinglePost from './pages/single-post/SinglePost';
import { landingPageLoader, listPageLoader, singlePostLoader, userPostsLoader } from './lib/loaders';
import EditPost from './pages/edit-post/EditPost';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
          loader: landingPageLoader,
        },
        {
          path: "/login",
          element: <SignIn />
        },
        {
          path: "/register",
          element: <SignUp />
        },
        {
          path: "/listings",
          element: <Listings />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePost />,
          loader: singlePostLoader,
        }
      ]
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [ // Whatever is added here is considered to be a protected route. Only authenticated users should be able to access as specified in the RequiredAuth layout
        {
          path: "/account",
          element: <ProfilePage />,
          loader: userPostsLoader,
        },
        {
          path: "/account/update",
          element: <UpdateProfile />
        },
        {
          path: "add-listings",
          element: <AddListings />
        },
        {
          path: "/edit-post/:id",
          element: <EditPost />,
          loader: singlePostLoader,
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
