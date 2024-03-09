import { useState } from 'react';
import { toast } from 'react-toastify';
import Logo from '../assets/logo.png';
import { GoGear } from 'react-icons/go';
import { MdOutlineLogout } from 'react-icons/md';
import ChatTab from '../components/ChatTab';
import Avatar from '../components/Avatar';
import AuthContext from '../context';
import { logoutApi } from '../apis';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SettingModal from '../components/SettingModal';
import { TbLayoutSidebarLeftCollapseFilled } from 'react-icons/tb';
import { TbLayoutSidebarLeftExpandFilled } from 'react-icons/tb';
import { Tooltip } from 'react-tooltip';

const Sidebar = () => {
	const [toolbox, setToolbox] = useState(false);
	const [showSetting, setShowSetting] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const { state, dispatch } = AuthContext();
	const { user, chats } = state;
	const navigate = useNavigate();

	const toolboxHandler = () => {
		// if click on the item, toggle the toolbox
		setToolbox(!toolbox);
		//if click outside the item, close the toolbox
		document.addEventListener('click', (e) => {
			if (e.target.closest('.item-box')) return;
			setToolbox(false);
		});
	};

	const settingHandler = () => {
		setShowSetting(true);
	};

	const logoutHandler = async () => {
		dispatch({ type: 'LOGOUT' });
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
		navigate('/login', { replace: true });
	};

	return (
		<div className="flex h-screen w-screen">
			<nav
				className={`bg-black w-64 px-3 py-3.5 h-full ${
					isSidebarOpen ? '' : 'hidden'
				} flex flex-col justify-between`}
			>
				<div>
					<div>
						<Link
							className="text-white flex px-2 items-center gap-2 rounded-lg h-10 hover:bg-neutral-800"
							to="/"
						>
							<img className="h-10 w-10" src={Logo} />
							MoeGPT
						</Link>
					</div>

					<div className="flex flex-col gap-2">
						<div className="overflow-y-auto h-[80vh]">
							<h3 className="h-9 pb-2 pt-3 px-2 text-dark-grey text-xs">Today</h3>
							<ol className="text-light-grey">
								{!chats && <p>No previous chat.</p>}
								{chats &&
									chats.map((chat, index) => (
										<ChatTab key={index} id={chat._id} name={chat.name} />
									))}
							</ol>
						</div>
					</div>
				</div>

				<div>
					{toolbox && (
						<div className="absolute bottom-[70px] w-[232px] border border-slate-700 bg-neutral-800 flex flex-col gap-2 mb-1 py-2 rounded-md">
							<div
								onClick={settingHandler}
								className="item-box rounded-none hover:bg-gray-700 flex gap-2"
							>
								<GoGear />
								Profile Settings
								{showSetting ? (
									<SettingModal
										closeModal={() => {
											setShowSetting(false);
											setToolbox(false);
										}}
									/>
								) : (
									''
								)}
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
							onClick={() => {
								setIsSidebarOpen(false);
							}}
						/>
					)}
					{!isSidebarOpen && (
						<TbLayoutSidebarLeftExpandFilled
							size="1.5em"
							className="hover:text-gray-500 cursor-pointer"
							onClick={() => {
								setIsSidebarOpen(true);
							}}
						/>
					)}
				</header>
				<Outlet />
			</div>
			<Tooltip
				id="tooltip"
				style={{
					fontSize: '12px',
					borderRadius: '10px',
					backgroundColor: 'black',
					color: 'white',
				}}
				border="1px solid rgb(209 213 219)"
			/>
		</div>
	);
};

export default Sidebar;
