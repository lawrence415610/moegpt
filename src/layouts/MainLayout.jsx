import { useState } from 'react';
import { toast } from 'react-toastify';
import Logo from '/logo.png';
import { GoGear } from 'react-icons/go';
import { MdOutlineLogout } from 'react-icons/md';
import TopicTab from '../components/TopicTab';
import Avatar from '../components/Avatar';
import topicContext from '../context/topic';
import { logoutApi } from '../apis';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SettingModal from '../components/SettingModal';
import { TbLayoutSidebarLeftCollapseFilled } from 'react-icons/tb';
import { TbLayoutSidebarLeftExpandFilled } from 'react-icons/tb';
import { CgAddR } from 'react-icons/cg';
import { Tooltip } from 'react-tooltip';
import { auth } from '../firebase/index';

const MainLayout = () => {
	const [toolbox, setToolbox] = useState(false);
	const [showSetting, setShowSetting] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const user = auth.currentUser;
	const { state } = topicContext();
	const { topics } = state;
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
		try {
			const data = await logoutApi();
			if (data.ok) {
				toast.success('User successfully Logged out.');
			} else {
				toast.error('Error happened while sending logout request.');
			}
		} catch (err) {
			toast.error(err);
		} finally {
			navigate('/login', { replace: true });
		}
	};

	const isWithinLastNDays = (dateString, days) => {
		const date = new Date(dateString);
		const now = new Date();
		now.setHours(0, 0, 0, 0); // Normalize to start of today to include all of today's dates
		const then = new Date(date);
		then.setHours(0, 0, 0, 0); // Normalize comparison date
		const diffTime = now - then;
		const diffDays = diffTime / (1000 * 60 * 60 * 24);
		return diffDays <= days;
	};

	const filterTodaytopics = (topics) => {
		const startOfToday = new Date();
		startOfToday.setHours(0, 0, 0, 0);
		return topics.filter((topic) => new Date(topic.createdAt) >= startOfToday);
	};

	const filterPrevious7Daystopics = (topics) => {
		return topics.filter(
			(topic) =>
				isWithinLastNDays(topic.createdAt, 7) && !isWithinLastNDays(topic.createdAt, 1)
		);
	};

	const filterPrevious30Daystopics = (topics) => {
		return topics.filter(
			(topic) =>
				isWithinLastNDays(topic.createdAt, 30) && !isWithinLastNDays(topic.createdAt, 7)
		);
	};

	const filterMoreThan30Daystopics = (topics) => {
		return topics.filter((topic) => !isWithinLastNDays(topic.createdAt, 30));
	};

	return (
		<div className="body-font flex h-screen w-screen">
			{/* Sidebar Section */}
			<nav
				className={`bg-black w-64 px-3 py-3.5 h-full ${
					isSidebarOpen ? '' : 'hidden'
				} flex flex-col justify-between`}
			>
				<div>
					<div>
						<Link
							className="flex px-2 items-center justify-between gap-2 h-10 hover:bg-neutral-800"
							to="/"
						>
							<div className="flex items-center">
								<img className="h-10 w-10 rounded-full" src={Logo} />
								<span className="mt-1 ml-3">MoeGPT</span>
							</div>
							<div>
								<CgAddR
									className="size-5"
									data-tooltip-id="tooltip"
									data-tooltip-content="Start a new topic here."
								/>
							</div>
						</Link>
					</div>

					<div className="flex flex-col gap-2">
						{/* Today */}
						{filterTodaytopics(topics).length === 0 && null}
						{filterTodaytopics(topics).length !== 0 && (
							<div className="overflow-y-auto mt-3">
								<h3 className="h-9 pb-2 pt-3 px-2 text-dark-grey text-xs">Today</h3>
								<ol>
									{filterTodaytopics(topics).map((topic) => (
										<TopicTab key={topic.id} id={topic.id} name={topic.name} />
									))}
								</ol>
							</div>
						)}

						{/* Previous 7 Days */}
						{filterPrevious7Daystopics(topics).length === 0 && null}
						{filterPrevious7Daystopics(topics).length !== 0 && (
							<div className="overflow-y-auto mt-5">
								<h3 className="h-9 pb-2 pt-3 px-2 text-dark-grey text-xs">
									Previous 7 Days
								</h3>
								<ol>
									{filterPrevious7Daystopics(topics).map((topic) => (
										<TopicTab key={topic.id} id={topic.id} name={topic.name} />
									))}
								</ol>
							</div>
						)}
						{/* Previous 30 Days */}
						{filterPrevious30Daystopics(topics).length === 0 && null}
						{filterPrevious30Daystopics(topics).length !== 0 && (
							<div className="overflow-y-auto mt-5">
								<h3 className="h-9 pb-2 pt-3 px-2 text-dark-grey text-xs">
									Previous 30 Days
								</h3>
								<ol>
									{filterPrevious30Daystopics(topics).map((topic) => (
										<TopicTab key={topic.id} id={topic.id} name={topic.name} />
									))}
								</ol>
							</div>
						)}

						{/* More Than 30 Days */}
						{filterMoreThan30Daystopics(topics).length === 0 && null}
						{filterMoreThan30Daystopics(topics).length !== 0 && (
							<div className="overflow-y-auto mt-5">
								<h3 className="h-9 pb-2 pt-3 px-2 text-dark-grey text-xs">
									More Than 30 Days
								</h3>
								<ol>
									{filterMoreThan30Daystopics(topics).map((topic) => (
										<TopicTab key={topic.id} id={topic.id} name={topic.name} />
									))}
								</ol>
							</div>
						)}
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
						{user && <Avatar src={user.photoURL} />}
						{user && <span className="select-none">{user.displayName}</span>}
					</div>
				</div>
			</nav>
			{/* Sidebar Section END */}
			{/* Header Section */}
			<div
				className={`h-full bg-gray-900 flex-1 ${
					isSidebarOpen ? 'w-[calc(100%-16rem)]' : 'w-full'
				}`}
			>
				<header className="fixed pt-[22px] pl-[18px]">
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
				{/* Header Section END */}
				<main className="w-full h-full flex flex-col">
					{/* Main page Section */}
					<Outlet />
					{/* Main page Section END */}
					<footer className="text-center text-xs px-2 py-2">Made by Lawrence Liu</footer>
				</main>
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

export default MainLayout;
