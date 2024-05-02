import axios from 'axios';

const baseUrl = 'http://localhost:5001/moegpt-bb23f/us-central1';

axios.defaults.baseURL = baseUrl;

// chat features
export const addNewTopicApi = async (userMsg, userId) => {
	try {
		const { data } = await axios.post('/addNewTopic', {
			userMsg,
			userId,
		});
		return data;
	} catch (err) {
		console.log('error happened when trying to send message to GPT-3.5, Error Msg: ', err);
	}
};

export const addNewChatApi = async (topicId, userMsg) => {
	try {
		const { data } = await axios.post('/addNewChat', {
			topicId,
			userMsg,
		});
		return data;
	} catch (err) {
		console.log('error happened when trying to send message to GPT-3.5, Error Msg: ', err);
	}
};

export const getAllTopicsApi = async (userId) => {
	try {
		const { data } = await axios.get('/getAllTopics', {
			params: { userId },
		});
		return data;
	} catch (err) {
		console.log('error happened when trying to get chats records, Error Msg: ', err);
	}
};

export const editTopicNameApi = async (topicId, name) => {
	try {
		const { data } = await axios.post('/updateTopicName', {
			topicId,
			name,
		});
		return data;
	} catch (err) {
		console.log('error happened when trying to edit topic name, Error Msg: ', err);
	}
};

export const deleteTopicApi = async (topicId) => {
	try {
		const { data } = await axios.delete('/deleteTopic', {
			params: { topicId },
		});
		return data;
	} catch (err) {
		console.log('error happened when trying to delete topic, Error Msg: ', err);
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
