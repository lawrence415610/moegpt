import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

const router = createBrowserRouter([
	{ path: '/', element: <HomePage /> },
	{ path: '/login', element: <LoginPage /> },
	{ path: '/signup', element: <SignupPage/> },
]);

const Router = (children) => {
	return <RouterProvider router={router}>{children}</RouterProvider>;
};

export default Router;
