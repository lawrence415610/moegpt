import { useEffect, useState } from 'react';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import { addNewChatApi, getAllTopicsApi } from '../apis';
import TopicContext from '../context/topic';
import { useParams } from 'react-router-dom';
import UserMessageForm from '../components/UserMessageForm';
import { auth } from '../firebase/index';

const TopicPage = () => {
	const { dispatch } = TopicContext();
	const id = useParams().id;
	const [chatSessions, setChatSessions] = useState([]);
	const [loading, setLoading] = useState(false);
	const user = auth.currentUser;
	const userId = user.uid;

	const submitHandler = (e) => {
		e.preventDefault();
		const inputText = e.target[0].value;
		if (!inputText) return;
		setLoading(true);
		addNewChatApi(id, inputText)
			.then((res) => {
				dispatch({
					type: 'UPDATE_TOPIC',
					payload: res,
				});
				setChatSessions(res.chats);
				setLoading(false);
			})
			.catch((err) => {
				toast.error(err);
			});
	};

	useEffect(() => {
		getAllTopicsApi(userId)
			.then((res) => {
				dispatch({
					type: 'GET_TOPICS',
					payload: res,
				});
				const topic = res.find((topic) => topic.id === id);
				setChatSessions(topic.chats);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [dispatch, id, userId]);

	return (
		<>
			<div className="flex-1 overflow-hidden">
				<div className="h-full overflow-auto p-10">
					{chatSessions.map(({ userMsg, gptMsg }, index) => {
						return (
							<article key={index}>
								<Message user={'You'} text={userMsg} />
								<Message user={'MoeGPT'} text={gptMsg} />
							</article>
						);
					})}
				</div>
			</div>

			<div className="w-full pt-2">
				<UserMessageForm loading={loading} submitHandler={submitHandler} />
			</div>
		</>
	);
};

export default TopicPage;
