require('dotenv').config({ path: './.env.local' });
const OpenAI = require('openai');
const { onRequest } = require('firebase-functions/v2/https');
// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();
const db = getFirestore();
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const getAllTopics = onRequest({ cors: true }, (req, res) => {
	const userId = req.query.userId;
	const topics = db.collection('topics');
	const query = topics.where('userId', '==', userId);
	query
		.get()
		.then((snapshot) => {
			const data = snapshot.docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			});
			res.send(data);
		})
		.then((err) => {
			res.send(err);
		});
});

const addNewTopic = onRequest({ cors: true }, async (req, res) => {
	const { userId, userMsg } = req.body;
	const getResponse = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'system',
				content: 'You are a helpful assistant.',
			},
			{
				role: 'user',
				content: userMsg,
			},
		],
	});
	const gptMsg = getResponse.choices[0].message.content;
	const newTopic = {
		userId,
		updatedAt: new Date().toISOString(),
		name: userMsg.slice(0, 20),
		chats: [
			{
				userMsg,
				gptMsg,
				updatedAt: new Date().toISOString(),
			},
		],
	};

	db.collection('topics')
		.add(newTopic)
		.then((topicRef) => {
			res.send({ id: topicRef.id, ...newTopic });
		})
		.catch((err) => {
			res.send(err);
		});
});

const addNewChat = onRequest(
	{ cors: true },
	async (req, res) => {
		const { topicId, userMsg } = req.body;
		const topic = (await db.collection('topics').doc(topicId).get()).data();
		const chats = topic.chats;
		const messages = [];
		chats.forEach((chat) => {
			if (chat && chat.userMsg) messages.push({ role: 'user', content: chat.userMsg });
			if (chat && chat.gptMsg) messages.push({ role: 'assistant', content: chat.gptMsg });
		});
		messages.push({
			role: 'user',
			content: userMsg,
		});
		messages.unshift({
			role: 'system',
			content: 'You are a helpful assistant.',
		});
		const getResponse = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages,
		});
		const gptMsg = getResponse.choices[0].message.content;
		chats.push({
			userMsg,
			gptMsg,
		});

		db.collection('topics')
			.doc(topicId)
			.update(
				{
					chats,
					updatedAt: new Date().toISOString(),
				},
				{ merge: true }
			)
			.then(() => {
				res.send({ userMsg, gptMsg });
			})
			.catch((err) => {
				res.send(err);
			});
	},
	{ cors: true }
);

module.exports = {
	getAllTopics,
	addNewTopic,
	addNewChat,
};
