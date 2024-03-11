import { useState, useEffect } from 'react';
import Logo from '/logo.png';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import { addNewChat, getChatsApi } from '../apis';
import AuthContext from '../context';
import { useParams } from 'react-router-dom';
import UserMessageForm from '../components/UserMessageForm';

const TopicPage = () => {
	const { state, dispatch } = AuthContext();
	const user = state.user;
	const id = useParams().id;
	const [chatSessions, setChatSessions] = useState([]);

	const submitHandler = (e) => {
		e.preventDefault();
		const inputText = e.target[0].value;
		if (!inputText) return;
		addNewChat(inputText, id)
			.then((res) => {
				dispatch({
					type: 'ADD_CHAT',
					payload: res,
				});
				setChatSessions(res.chatsContent);
				e.target[0].value = '';
			})
			.catch((err) => {
				toast.error(err);
			});
	};

	useEffect(() => {
		getChatsApi().then((res) => {
			dispatch({
				type: 'GET_CHATS',
				payload: res,
			});
			const chatsContent = res.find((chat) => chat._id === id).chatsContent;
			setChatSessions(chatsContent);
		});
	}, [id, dispatch]);

	return (
		<>
			<div className="flex-1 overflow-hidden">
				<div className="h-full overflow-auto p-10">
					{chatSessions.map(({ userMsg, gptMsg }, index) => {
						return (
							<article key={index}>
								<Message profile={user.avatar} user={'You'} text={userMsg} />
								<Message profile={Logo} user={'MoeGPT'} text={gptMsg} />
							</article>
						);
					})}
				</div>
			</div>

			<div className="w-full pt-2">
				<UserMessageForm submitHandler={submitHandler} />
			</div>
		</>
	);
};

export default TopicPage;
