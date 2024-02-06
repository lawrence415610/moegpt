import axios from 'axios';

const baseUrl = 'http://localhost:5555/api';
axios.defaults.baseURL = baseUrl;

export const getCsrfTokenApi = async () => {
	const { data } = await axios.get('/csrf-token', {
		withCredentials: true,
		credentials: 'include',
	});
	return data;
};

export const getCurrentUserApi = async () => {
	const { data } = await axios.get('/current-user', {
		withCredentials: true,
		credentials: 'include',
	});
	return data;
};

export const loginApi = async ({ email, password }) => {
	const { data } = await axios.post(
		'/login',
		{
			email,
			password,
		},
		{ withCredentials: true, credentials: 'include' }
	);
	return data;
};

export const signupApi = async ({ email, password }) => {
	const { data } = await axios.post('/signup', {
		email,
		password,
		username: email.split('@')[0],
	});
	return data;
};
