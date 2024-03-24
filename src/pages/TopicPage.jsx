import { useState, useEffect } from 'react';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import { addNewChat, getChatsApi } from '../apis';
import ChatContext from '../context/chat';
import AuthContext from '../context/auth';
import { useParams } from 'react-router-dom';
import UserMessageForm from '../components/UserMessageForm';

const TopicPage = () => {
	const { dispatch: chatDispatch } = ChatContext();
	const { state: authState } = AuthContext();
	const user = authState.user;
	const userId = user._id;
	const id = useParams().id;
	const [chatSessions, setChatSessions] = useState([]);
	const [loading, setLoading] = useState(false);

	const submitHandler = (e) => {
		e.preventDefault();
		const inputText = e.target[0].value;
		if (!inputText) return;
		setLoading(true);
		addNewChat(inputText, id)
			.then((res) => {
				chatDispatch({
					type: 'ADD_CHAT',
					payload: res,
				});
				setChatSessions(res.chatsContent);
				setLoading(false);
			})
			.catch((err) => {
				toast.error(err);
			});
	};

	useEffect(() => {
		getChatsApi(userId).then((res) => {
			chatDispatch({
				type: 'GET_CHATS',
				payload: res,
			});
			const chatsContent = res.find((chat) => chat._id === id).chatsContent;
			setChatSessions(chatsContent);
		});
	}, [id, chatDispatch, userId]);

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
