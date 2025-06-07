import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home/Home.js"
import Profile from './pages/Profile/Profile.jsx'
import Explore from "./pages/Explore/Explore.jsx"
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp.jsx';
import Navbar from './components/Navbar'
import AuthHeader from './components/AuthHeader.jsx'
import Error from './pages/Error/Error';
import React from 'react';


const Layout = () => {
  return (
    <div className='md:w-8/12 mx-auto'>
      <Navbar />
      <Outlet></Outlet>
    </div>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "profile/:id", element: <Profile /> },
      { path: "explore", element: <Explore /> },
    ],
  },
  {
    path: "/signin",
    element: <AuthHeader />,
    children: [{ index: true, element: <SignIn /> }],
  },
  {
    path: "/signup",
    element: <AuthHeader />,
    children: [{ index: true, element: <SignUp /> }],
  },
  {
    path: "/signout",
    element: <AuthHeader />,
    children: [{ index: true, element: <SignIn /> }],
  },
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
