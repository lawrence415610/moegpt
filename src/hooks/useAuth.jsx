import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const authContext = createContext();

const useAuth = () => {
	const [user, setUser] = useState(null);
	const token = Cookies.get('token');

	useEffect(() => {
		if (token) {
			setUser({
				username: 'test',
			});
		} else {
			setUser(null);
		}
	}, [token]);
    
	return {
		user,
		login() {
            //TODO: get response from server
			return new Promise((res) => {
				res();
				Cookies.set('token', 'test');
				setUser({
					username: 'test',
				});
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
