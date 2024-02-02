import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

const HistoryRecord = ({ titleText, changeHandler }) => {
	const [isEdit, setIsEdit] = useState(false);
	const titleRef = useRef(null);

	useEffect(() => {
		if (isEdit) {
			titleRef.current.focus();
		}
	}, [isEdit]);

	return (
		<li className="group relative ">
			{isEdit ? (
				<div className="p-2 text-sm  bg-gray-800 rounded-lg">
					<input
						className="grow bg-gray-800 outline-none border-2 border-transparent focus:border-solid  focus:border-indigo-600"
						value={titleText}
						onChange={changeHandler}
						onBlur={() => setIsEdit(false)}
						ref={titleRef}
					></input>
				</div>
			) : (
				<a className="p-2 text-sm flex group-hover:bg-gray-800 rounded-lg " href="/">
					<div className="grow border-2 border-transparent">{titleText}</div>
				</a>
			)}

			<div className="absolute bottom-0 right-0 top-0 pr-2 items-center gap-1.5 hidden group-hover:flex">
				<button className="hover:translate-y-0.5" onClick={() => setIsEdit(true)}>
					<FiEdit2 />
				</button>
				<button className="hover:text-rose-600">
					<RiDeleteBin6Line />
				</button>
			</div>
		</li>
	);
};

HistoryRecord.propTypes = {
	titleText: PropTypes.string.isRequired,
	changeHandler: PropTypes.func.isRequired,
};

export default HistoryRecord;
