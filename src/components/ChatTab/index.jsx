import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import DeleteModal from '../DeleteModal';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

const ChatTab = ({ id, name }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [titleText, setTitleText] = useState(name);
	const titleRef = useRef(null);

	useEffect(() => {
		if (isEdit) {
			titleRef.current.focus();
		}
	}, [isEdit]);

	const handleTitleChange = (e) => {
		setTitleText(e.target.value);
	};

	return (
		<>
			<li className="group relative ">
				{isEdit ? (
					<div className="p-2 text-sm bg-neutral-800 rounded-lg">
						<input
							className="grow bg-neutral-800 outline-none border-2 border-transparent focus:border-solid  focus:border-emerald-500"
							value={titleText}
							onChange={handleTitleChange}
							onBlur={() => setIsEdit(false)}
							ref={titleRef}
						></input>
					</div>
				) : (
					<NavLink
						className={({ isActive }) =>
							`p-2 text-sm flex rounded-lg group-hover:bg-neutral-800 group-hover:bg-gradient-to-r group-hover:text-transparent bg-clip-text from-emerald-500 ${
								isActive ? 'text-emerald-500 font-semibold' : ''
							} `
						}
						to={`chats/${id}`}
					>
						<div className="grow border-2 border-transparent">{titleText}</div>
					</NavLink>
				)}

				<div className="absolute bottom-0 right-0 top-0 pr-2 items-center gap-1.5 hidden group-hover:flex">
					<button
						className="hover:translate-y-0.5"
						onClick={() => setIsEdit(true)}
						data-tooltip-id="tooltip"
						data-tooltip-content="Rename"
					>
						<FiEdit2 />
					</button>
					<button
						className="hover:text-rose-600"
						onClick={() => setIsDelete(true)}
						data-tooltip-id="tooltip"
						data-tooltip-content="Delete"
					>
						<RiDeleteBin6Line />
					</button>
				</div>
			</li>
			{isDelete ? (
				<DeleteModal titleText={titleText} closeModal={() => setIsDelete(false)} />
			) : (
				<></>
			)}
		</>
	);
};

ChatTab.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default ChatTab;
