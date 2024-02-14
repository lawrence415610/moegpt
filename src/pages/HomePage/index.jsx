import { useState, useRef, useEffect } from 'react';
import Logo from '../../assets/logo.png';
import ChatRecord from './ChatRecord';
import HistoryRecord from './HistoryRecord';
import { TbLayoutSidebarLeftCollapseFilled } from 'react-icons/tb';
import { TbLayoutSidebarLeftExpandFilled } from 'react-icons/tb';
import AuthContext from '../../context';
import Avatar from '../../components/Avatar';
import { GoGear } from 'react-icons/go';
import { MdOutlineLogout } from 'react-icons/md';
import { logoutApi } from '../../apis';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	const maxTextAreaHeight = 200;
	const textAreaRef = useRef(null);
	const [inputText, setInputText] = useState('');
	const [titleText, setTitleText] = useState('Who are you?');
	const [isTextAreaOverflow, setIsTextAreaOverflow] = useState(false);
	const [chatSessions, setChatSessions] = useState([]);
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [toolbox, setToolbox] = useState(false);
	const { state, dispatch } = AuthContext();
	const user = state.user;
	// const navigate = useNavigate();

	const changeHandler = (e) => {
		setInputText(e.target.value);
		setIsTextAreaOverflow(e.target.scrollHeight > maxTextAreaHeight);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		chatSessions.push({ question: inputText, answer: 'You know nothing, Snow.' });
		setChatSessions(chatSessions);
		setInputText('');
	};

	const toolboxHandler = () => {
		// if click on the item, toggle the toolbox
		setToolbox(!toolbox);
		//if click outside the item, close the toolbox
		document.addEventListener('click', (e) => {
			if (e.target.closest('.item-box')) return;
			setToolbox(false);
		});
	};

	const logoutHandler = async () => {
		dispatch({ type: 'LOGOUT' });
		window.localStorage.removeItem('user');
		// I don't know why the backend didn't remove the token from the cookie
		// so I remove it manually
		Cookies.remove('token');
		try {
			const data = await logoutApi();
			if (data.ok) {
				toast.success('User successfully Logged out.');
			} else {
				toast.error('Error happened while sending logout request.');
			}
		} catch (err) {
			toast.error(err);
		}
		window.location.replace('/login');
		// why useNavigate doesn't work either?
		// navigate('/login', { replace: true });
	};

	useEffect(() => {
		if (textAreaRef) {
			textAreaRef.current.style.height = '0px';
			const { scrollHeight } = textAreaRef.current;
			textAreaRef.current.style.height = `${scrollHeight}px`;
		}
	}, [textAreaRef, inputText]);

	return (
		<div className="flex h-screen w-screen">
			<nav
				className={`bg-black w-64 px-3 py-3.5 h-full ${
					isSidebarOpen ? '' : 'hidden'
				} flex flex-col justify-between`}
			>
				<div>
					<div>
						<a
							className="text-white flex px-2 items-center gap-2 rounded-lg h-10 hover:bg-neutral-800"
							href="/"
						>
							<img className="h-10 w-10" src={Logo} />
							MoeGPT
						</a>
					</div>

					<div className="flex flex-col gap-2">
						<div className="overflow-y-auto h-[80vh]">
							<h3 className="h-9 pb-2 pt-3 px-2 text-dark-grey text-xs">Today</h3>
							<ol className="text-light-grey">
								<HistoryRecord
									titleText={titleText}
									changeHandler={(e) => setTitleText(e.target.value)}
								/>
							</ol>
						</div>
					</div>
				</div>

				<div>
					{toolbox && (
						<div className="absolute bottom-[70px] w-[232px] border border-slate-700 bg-neutral-800 flex flex-col gap-2 mb-1 py-2 rounded-md">
							<div className="item-box rounded-none hover:bg-gray-700 flex gap-2">
								<GoGear />
								Profile Settings
							</div>
							<div
								onClick={logoutHandler}
								className="item-box rounded-none border-t border-gray-700 hover:bg-gray-700 flex gap-2 text-red-500"
							>
								<MdOutlineLogout />
								Logout
							</div>
						</div>
					)}
					<div
						className={`item-box ${toolbox ? 'bg-neutral-800' : ''}`}
						onClick={() => toolboxHandler()}
					>
						<Avatar src={user.avatar} />
						<span className="select-none">{user.username}</span>
					</div>
				</div>
			</nav>

			<div className={`h-full flex-1 ${isSidebarOpen ? 'w-[calc(100%-16rem)]' : 'w-full'}`}>
				<header className="fixed p-3">
					{isSidebarOpen && (
						<TbLayoutSidebarLeftCollapseFilled
							size="1.5em"
							className="hover:text-gray-500 cursor-pointer"
							onClick={() => setIsSidebarOpen(false)}
						/>
					)}
					{!isSidebarOpen && (
						<TbLayoutSidebarLeftExpandFilled
							size="1.5em"
							className="hover:text-gray-500 cursor-pointer"
							onClick={() => setIsSidebarOpen(true)}
						/>
					)}
				</header>
				<main className="w-full h-full flex flex-col">
					{chatSessions.length == 0 ? (
						<div className="flex flex-1 items-center justify-center flex-col">
							<img className="h-20 w-20 mb-3" src={Logo} />
							<div className="text-2xl  font-medium mb-4">
								How can I help you today?
							</div>
						</div>
					) : (
						<div className="flex-1 overflow-hidden">
							<div className="h-full overflow-auto">
								{chatSessions.map(({ question, answer }) => {
									return (
										<>
											<ChatRecord
												profile={Logo}
												user={'You'}
												text={question}
											/>
											<ChatRecord
												profile={Logo}
												user={'MoeGPT'}
												text={answer}
											/>
										</>
									);
								})}
							</div>
						</div>
					)}

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
			</div>
		</div>
	);
};

export default HomePage;
