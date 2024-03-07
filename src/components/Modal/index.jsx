import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

const Modal = ({ title, closeModal, children }) => {
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
		<div className="fixed z-10 left-0 top-0 w-full h-full  bg-black/50 cursor-default">
			<div className="grid h-full w-full grid-cols-[10px_1fr_10px] grid-rows-[minmax(10px,_1fr)_auto_minmax(10px,_1fr)]">
				<div
					className="relative col-start-2 row-start-2 rounded-lg bg-white flex flex-col text-black max-w-md left-1/2 -translate-x-1/2"
					ref={modalRef}
				>
					<div className="px-4 pb-4 pt-5 flex items-center border-b border-black/10">
						<div className="font-medium text-lg">{title}</div>
					</div>
					{children}
				</div>
			</div>
		</div>
	);
};

Modal.propTypes = {
	title: PropTypes.string.isRequired,
	closeModal: PropTypes.func.isRequired,
	children: PropTypes.element.isRequired,
};

export default Modal;
