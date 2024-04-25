const { onRequest } = require('firebase-functions/v2/https');

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();
const db = getFirestore();

const getAllTopics = onRequest((req, res) => {
	const userId = req.query.userId;
	const topics = db.collection('topics');

	const query = topics.where('userId', '==', userId);
	query
		.get()
		.then((snapshot) => {
			const data = snapshot.docs.map((doc) => doc.data());
			res.send(data);
		})
		.then((err) => {
			res.send(err);
		});
});

const addNewTopic = onRequest((req, res) => {
	const { userId, userMsg } = req.body;
	const gptMsg = 'Hello, how can I help you today?';
	const newTopic = {
		userId,
		updatedAt: new Date().toISOString(),
		name: userMsg.slice(0, 20),
	};

	db.collection('topics')
		.add(newTopic)
		.then((topicRef) => {
			db.collection('chats')
				.add({
					userMsg,
					gptMsg,
					updatedAt: new Date().toISOString(),
					topicId: topicRef.id,
				})
				.then((chatRef) => {
					res.send({ chatId: chatRef.id, topicId: topicRef.id });
				})
				.catch((err) => {
					res.send(err);
				});
		})
		.catch((err) => {
			res.send(err);
		});
});

module.exports = {
	getAllTopics,
	addNewTopic,
};
