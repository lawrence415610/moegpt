import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RequireAuth from '../components/RequireAuth';

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
]);

const Router = () => {
	return <RouterProvider router={router} />;
};

export default Router;
