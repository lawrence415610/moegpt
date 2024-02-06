import { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getCsrfTokenApi } from '../apis';

const authContext = createContext();
const rootReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, user: action.payload };
		case 'LOGOUT':
			return { ...state, user: null };
		default:
			return state;
	}
};
const initialState = {
	user: null,
};

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(rootReducer, initialState);
	useEffect(() => {
		dispatch({
			type: 'LOGIN',
			payload: JSON.parse(window.localStorage.getItem('user')),
		});

		// csrf protection
		const getCsrfToken = async () => {
			try {
				const data = await getCsrfTokenApi();
				axios.defaults.headers['X-CSRF-Token'] = data.csrfToken;
			} catch (err) {
				throw new Error('Error happens when trying to get csrfToken, Error Msg: ' + err);
			}
		};
		getCsrfToken();
	}, []);
	return (
		<authContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</authContext.Provider>
	);
};

export default function AuthContext() {
	const context = useContext(authContext);
	if (!context) throw new Error('useAuthContext must be used within AuthProvider');
	return context;
}

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
