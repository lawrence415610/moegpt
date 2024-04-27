// import { useEffect } from 'react';
import Logo from '/logo.png';
import ChatContext from '../context/topic';
import { toast } from 'react-toastify';
import { addNewTopicApi, getAllTopicsApi } from '../apis';
import { useNavigate } from 'react-router-dom';
import UserMessageForm from '../components/UserMessageForm';
import { useState } from 'react';
import { auth } from '../firebase/index';
import { useEffect } from 'react';
const HomePage = () => {
	const { dispatch } = ChatContext();
	const navigate = useNavigate();
	const user = auth.currentUser;
	const userId = user.uid;
	const [loading, setLoading] = useState(false);

	const submitHandler = (e) => {
		e.preventDefault();
		const inputText = e.target[0].value;
		if (!inputText) return;
		setLoading(true);
		addNewTopicApi(inputText, userId)
			.then((res) => {
				dispatch({
					type: 'ADD_TOPIC',
					payload: res,
				});
				setLoading(false);
				navigate(`/topics/${res.id}`, { replace: true });
			})
			.catch((err) => {
				toast.error(err);
			});
	};

	useEffect(() => {
		getAllTopicsApi(userId).then((res) => {
			dispatch({
				type: 'GET_TOPICS',
				payload: res,
			});
		});
	}, [dispatch, userId]);

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
