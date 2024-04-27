import { useState } from 'react';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import { addNewChat } from '../apis';
import TopicContext from '../context/topic';
import { useParams } from 'react-router-dom';
import UserMessageForm from '../components/UserMessageForm';
const TopicPage = () => {
	const { dispatch } = TopicContext();
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
				dispatch({
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
