import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Logo from '../assets/logo.png';
import { GoGear } from 'react-icons/go';
import { MdOutlineLogout } from 'react-icons/md';
import HistoryRecord from '../components/HistoryRecord';
import Avatar from '../components/Avatar';
import AuthContext from '../context/auth';
import { logoutApi } from '../apis';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SettingModal from '../components/SettingModal';

const Sidebar = ({ isSidebarOpen = true }) => {
	const [titleText, setTitleText] = useState('Who are you?');
	const [toolbox, setToolbox] = useState(false);
	const [showSetting, setShowSetting] = useState(false);
	const { state, dispatch } = AuthContext();
	const user = state.user;
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
		window.location.replace('/login');
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
					{/* TODO: add a list of history records, based on data */}
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
			<Outlet />
		</div>
	);
};

Sidebar.propTypes = {
	isSidebarOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
