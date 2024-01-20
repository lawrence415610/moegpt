import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const authContext = createContext();

const useAuth = () => {
	const [user, setUser] = useState(null);
	const token = Cookies.get('token');

	useEffect(() => {
		if (!token) {
			setUser(null);
		} else {
			setUser({
				id: 1,
				username: 'test',
				email: 'test@test.com',
				avatar: 'https://picsum.photos/200',
			});
		}
	}, [token]);

	return {
		user,
		login(userInfo) {
			const { email, password } = userInfo;
			console.log({
				email,
				password,
			});
			//TODO: send this email and password to server, if resolve, get token and user info,
			// then set token and user info to cookies and setUser
			return new Promise((res) => {
				res();
				Cookies.set('token', 'test token');
			});
		},
		logout() {
			return new Promise((res) => {
				res();
				Cookies.remove('token');
				setUser(null);
			});
		},
	};
};

export const AuthProvider = ({ children }) => {
	const auth = useAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default function AuthContext() {
	const context = useContext(authContext);
	if (!context) throw new Error('useAuthContext must be used within AuthProvider');
	return context;
}

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
