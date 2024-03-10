import { useEffect } from 'react';
import Logo from '../assets/logo.png';
import AuthContext from '../context';
import { toast } from 'react-toastify';
import { createNewTopicApi } from '../apis';
import { getChatsApi } from '../apis';
import { useNavigate } from 'react-router-dom';
import UserMessageForm from '../components/UserMessageForm';
const HomePage = () => {
	const { state, dispatch } = AuthContext();
	const navigate = useNavigate();
	const user = state.user;

	const submitHandler = (e) => {
		e.preventDefault();
		const inputText = e.target[0].value;
		if (!inputText) return;
		createNewTopicApi(inputText, user._id)
			.then((res) => {
				if (res.id) {
					getChatsApi().then((res) => {
						dispatch({
							type: 'GET_CHATS',
							payload: res,
						});
					});
				}
				e.target[0].value = '';
				navigate(`/chats/${res.id}`, { replace: true });
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
		});
	}, [dispatch]);

	return (
		<>
			<div className="flex flex-1 items-center justify-center flex-col">
				<img className="h-20 w-20 mb-3" src={Logo} />
				<div className="text-2xl  font-medium mb-4">How can I help you today?</div>
			</div>

			<div className="w-full pt-2">
				<UserMessageForm submitHandler={submitHandler} />
			</div>
		</>
	);
};

export default HomePage;
