import { useEffect } from 'react';
import Logo from '/logo.png';
import AuthContext from '../context/auth';
import ChatContext from '../context/chat';
import { toast } from 'react-toastify';
import { createNewTopicApi } from '../apis';
import { getChatsApi } from '../apis';
import { useNavigate } from 'react-router-dom';
import UserMessageForm from '../components/UserMessageForm';
import { useState } from 'react';
const HomePage = () => {
	const { state: authState } = AuthContext();
	const { dispatch: chatDispatch } = ChatContext();
	const navigate = useNavigate();
	const user = authState.user;
	const userId = user._id;
	const [loading, setLoading] = useState(false);

	const submitHandler = (e) => {
		e.preventDefault();
		const inputText = e.target[0].value;
		if (!inputText) return;
		setLoading(true);
		createNewTopicApi(inputText, user._id)
			.then((res) => {
				if (res.id) {
					getChatsApi(userId).then((res) => {
						chatDispatch({
							type: 'GET_CHATS',
							payload: res,
						});
					});
				}
				setLoading(false);
				navigate(`/chats/${res.id}`, { replace: true });
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
		});
	}, [chatDispatch, userId]);

	return (
		<>
			<div className="flex flex-1 items-center justify-center flex-col">
				<img className="h-20 w-20 mb-3 rounded-full" src={Logo} />
				<div className="big-title-font mb-4">How can I help you today?</div>
			</div>

			<div className="w-full pt-2">
				<UserMessageForm loading={loading} submitHandler={submitHandler} />
			</div>
		</>
	);
};

export default HomePage;
