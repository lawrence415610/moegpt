import { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getCsrfTokenApi } from '../apis';

const authContext = createContext();
const rootReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, user: action.payload };
		case 'AVATAR':
			return { ...state, user: { ...state.user, ...action.payload } };
		case 'LOGOUT':
			return { ...state, user: null };
		case 'GET_CHATS':
			return { ...state, chats: action.payload };
		default:
			return state;
	}
};
const initialState = {
	user: null,
	chats: [],
};

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(rootReducer, initialState);
	useEffect(() => {
		dispatch({
			type: 'LOGIN',
			payload: JSON.parse(window.localStorage.getItem('user')),
		});

		axios.interceptors.response.use(
			function (response) {
				// any status code of range 2xx,then trigger
				return response;
			},
			function (error) {
				// any status code outside range of 2xx then trigger
				let res = error.response;
				if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
					return new Promise((resolve, reject) => {
						axios
							.get('logout')
							.then(() => {
								console.log('401 error');
								dispatch({ type: 'LOGOUT' });
								window.localStorage.removeItem('user');
								window.location.replace('/login');
							})
							.catch((err) => {
								console.log(err);
								reject(error);
							});
					});
				}
				return Promise.reject(error);
			}
		);

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
