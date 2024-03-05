import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import DeleteModal from '../DeleteModal';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const HistoryRecord = ({ titleText, changeHandler, id }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const titleRef = useRef(null);

	useEffect(() => {
		if (isEdit) {
			titleRef.current.focus();
		}
	}, [isEdit]);

	return (
		<>
			<li className="group relative ">
				{isEdit ? (
					<div className="p-2 text-sm bg-neutral-800 rounded-lg">
						<input
							className="grow bg-neutral-800 outline-none border-2 border-transparent focus:border-solid  focus:border-indigo-600"
							value={titleText}
							onChange={changeHandler}
							onBlur={() => setIsEdit(false)}
							ref={titleRef}
						></input>
					</div>
				) : (
					<Link
						className="p-2 text-sm flex group-hover:bg-neutral-800 rounded-lg "
						to={`chats/${id}`}
					>
						<div className="grow border-2 border-transparent">{titleText}</div>
					</Link>
				)}

				<div className="absolute bottom-0 right-0 top-0 pr-2 items-center gap-1.5 hidden group-hover:flex">
					<button className="hover:translate-y-0.5" onClick={() => setIsEdit(true)}>
						<FiEdit2 />
					</button>
					<button className="hover:text-rose-600" onClick={() => setIsDelete(true)}>
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

HistoryRecord.propTypes = {
	titleText: PropTypes.string.isRequired,
	changeHandler: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
};

export default HistoryRecord;
