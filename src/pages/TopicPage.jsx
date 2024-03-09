import { useState, useRef, useEffect } from 'react';
import Logo from '../assets/logo.png';
import ChatRecord from '../components/ChatRecord';
import { toast } from 'react-toastify';
import { addNewChat, getChatsApi } from '../apis';
import AuthContext from '../context';
import { useParams } from 'react-router-dom';

const TopicPage = () => {
	const { state, dispatch } = AuthContext();
	const user = state.user;
	const id = useParams().id;
	const maxTextAreaHeight = 200;
	const textAreaRef = useRef(null);
	const [inputText, setInputText] = useState('');
	const [isTextAreaOverflow, setIsTextAreaOverflow] = useState(false);
	const [chatSessions, setChatSessions] = useState([]);
	const changeHandler = (e) => {
		setInputText(e.target.value);
		setIsTextAreaOverflow(e.target.scrollHeight > maxTextAreaHeight);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (!inputText) return;
		addNewChat(inputText, id)
			.then((res) => {
				dispatch({
					type: 'ADD_CHAT',
					payload: res,
				});
				setInputText('');
			})
			.catch((err) => {
				toast.error(err);
			});
	};

	useEffect(() => {
		if (textAreaRef) {
			textAreaRef.current.style.height = '0px';
			const { scrollHeight } = textAreaRef.current;
			textAreaRef.current.style.height = `${scrollHeight}px`;
		}

		getChatsApi().then((res) => {
			dispatch({
				type: 'GET_CHATS',
				payload: res,
			});
			const chatsContent = res.find((chat) => chat._id === id).chatsContent;
			setChatSessions(chatsContent);
		});
	}, [textAreaRef, inputText, id, dispatch]);

	return (
		<main className="w-full h-full flex flex-col">
			<div className="flex-1 overflow-hidden">
				<div className="h-full overflow-auto m-14">
					{chatSessions.map(({ userMsg, gptMsg }, index) => {
						return (
							<article key={index}>
								<ChatRecord profile={user.avatar} user={'You'} text={userMsg} />
								<ChatRecord profile={Logo} user={'MoeGPT'} text={gptMsg} />
							</article>
						);
					})}
				</div>
			</div>

			<div className="w-full pt-2">
				<form className="gap-3 m-auto max-w-3xl" onSubmit={submitHandler}>
					<div className="bg-white border border-gray-300 rounded-2xl flex relative">
						<textarea
							placeholder="Message MoeGPT..."
							rows={1}
							className="w-full resize-none bg-transparent py-3.5 px-10 focus:outline-0"
							ref={textAreaRef}
							style={{
								maxHeight: `${maxTextAreaHeight}px`,
								overflow: `${isTextAreaOverflow ? '' : 'hidden'}`,
							}}
							onChange={changeHandler}
							value={inputText}
						></textarea>
						<button
							className="w-7 h-7 absolute bottom-3 right-3 text-white bg-black rounded-lg disabled:text-gray-400 disabled:bg-white"
							disabled={!inputText}
						>
							&uarr;
						</button>
					</div>
					<footer className="text-center text-xs text-gray-600 px-2 py-2">
						MoeGPT can make mistakes. Consider checking important information.
					</footer>
				</form>
			</div>
		</main>
	);
};

export default TopicPage;
