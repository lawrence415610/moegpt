import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RequireAuth from '../components/RequireAuth';
import SignupPage from '../pages/SignupPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<HomePage />
			</RequireAuth>
		),
	},
	{ path: '/login', element: <LoginPage /> },
	{ path: '/signup', element: <SignupPage /> },
]);

const Router = () => {
	return <RouterProvider router={router} />;
};

export default Router;
