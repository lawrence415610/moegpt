import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const DeleteModal = ({ titleText, closeModal }) => {
	const modalRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(e) {
			if (modalRef.current && !modalRef.current.contains(e.target)) {
				closeModal();
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [modalRef, closeModal]);

	return (
		<div className="fixed z-10 left-0 top-0 w-full h-full  bg-black/50">
			<div className="grid h-full w-full grid-cols-[10px_1fr_10px] grid-rows-[minmax(10px,_1fr)_auto_minmax(10px,_1fr)]">
				<div
					className="relative col-start-2 row-start-2 rounded-lg bg-white flex flex-col text-black max-w-md left-1/2 -translate-x-1/2"
					ref={modalRef}
				>
					<div className="px-4 pb-4 pt-5 flex items-center border-b border-black/10">
						<div className="font-medium text-lg">Delete chat?</div>
					</div>
					<div className="flex flex-col p-4 h-full">
						<div>
							This will delete <b>{titleText}</b>
						</div>
						<div className="grow flex gap-3 flex-row-reverse mt-5">
							<button
								className="bg-rose-700 text-white rounded-lg px-3 py-2 text-sm hover:bg-rose-900"
								onClick={closeModal}
							>
								Delete
							</button>
							<button
								className="rounded-lg px-3 py-2 text-sm border-black/10 border hover:bg-slate-200/40"
								onClick={closeModal}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

DeleteModal.propTypes = {
	titleText: PropTypes.string.isRequired,
	closeModal: PropTypes.func.isRequired,
};

export default DeleteModal;
