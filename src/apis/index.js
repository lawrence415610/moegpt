import axios from 'axios';

const baseUrl = 'http://localhost:5555/api';
axios.defaults.baseURL = baseUrl;

// Auth features
export const getCsrfTokenApi = async () => {
	try {
		const { data } = await axios.get('/csrf-token', {
			withCredentials: true,
			credentials: 'include',
		});
		return data;
	} catch (err) {
		console.log('error happened when trying to get csrf token, Error Msg: ', err);
	}
};

export const getCurrentUserApi = async () => {
	try {
		const { data } = await axios.get('/current-user', {
			withCredentials: true,
			credentials: 'include',
		});
		return data;
	} catch (err) {
		console.log('error happened when trying to get current user, Error Msg: ', err);
	}
};

export const loginApi = async ({ email, password }) => {
	try {
		const { data } = await axios.post(
			'/login',
			{
				email,
				password,
			},
			{ withCredentials: true, credentials: 'include' }
		);
		return data;
	} catch (err) {
		console.log('error happened when trying to login, Error Msg: ', err);
	}
};

export const signupApi = async ({ email, password }) => {
	try {
		const { data } = await axios.post('/signup', {
			email,
			password,
			username: email.split('@')[0],
		});
		return data;
	} catch (err) {
		console.log('error happened when trying to signup, Error Msg: ', err);
	}
};

export const logoutApi = async () => {
	try {
		const { data } = await axios.get('/logout', {
			credentials: 'include',
			withCredentials: true,
		});
		return data;
	} catch (err) {
		console.log('error happened when trying to logout, Error Msg: ', err);
	}
};

// chat features
export const sendMessageApi = async (message) => {
	try {
		const { data } = await axios.post('/gpt-response', {
			message,
		});
		return data;
	} catch (err) {
		console.log('error happened when trying to send message to GPT-3.5, Error Msg: ', err);
	}
};
