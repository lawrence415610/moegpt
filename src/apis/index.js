import axios from 'axios';

const baseUrl = 'http://localhost:5555/api';

// const baseUrl = 'http://ec2-52-91-173-125.compute-1.amazonaws.com:5555/api';
axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;

// Auth features

export const getCurrentUserApi = async () => {
	try {
		const { data } = await axios.get('/current-user');
		return data;
	} catch (err) {
		console.log('error happened when trying to get current user, Error Msg: ', err);
	}
};

export const loginApi = async ({ email, password }) => {
	try {
		const { data } = await axios.post('/login', {
			email,
			password,
		});
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
		const { data } = await axios.get('/logout');
		return data;
	} catch (err) {
		console.log('error happened when trying to logout, Error Msg: ', err);
	}
};

// chat features
export const createNewTopicApi = async (message, userId) => {
	try {
		const { data } = await axios.post('/create-new-topic', {
			message,
			userId,
		});
		return data;
	} catch (err) {
		console.log('error happened when trying to send message to GPT-3.5, Error Msg: ', err);
	}
};

export const addNewChat = async (message, chatsId) => {
	try {
		const { data } = await axios.post('/add-new-chat', {
			message,
			chatsId,
		});
		return data;
	} catch (err) {
		console.log('error happened when trying to send message to GPT-3.5, Error Msg: ', err);
	}
};

export const getChatsApi = async (userId) => {
	try {
		const { data } = await axios.get('/chats', {
			params: { userId },
		});
		return data;
	} catch (err) {
		console.log('error happened when trying to get chats records, Error Msg: ', err);
	}
};

export const editTopicNameApi = async (chatsId, name) => {
	try {
		const { data } = await axios.post('/update-topic-name', {
			chatsId,
			name,
		});
		return data;
	} catch (err) {
		console.log('error happened when trying to edit topic name, Error Msg: ', err);
	}
};

export const deleteTopicApi = async (chatsId) => {
	try {
		const { data } = await axios.delete('/delete-topic', {
			params: { chatsId },
		});
		return data;
	} catch (err) {
		console.log('error happened when trying to delete topic, Error Msg: ', err);
	}
};

// settings
export const uploadAvatarApi = async ({ image, email }) => {
	try {
		const { data, status } = await axios.post('/upload-avatar', {
			image,
			email,
		});
		return { data, status };
	} catch (err) {
		console.log('error happened when trying to upload avatar, Error Msg: ', err);
	}
};
