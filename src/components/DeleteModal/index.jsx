import PropTypes from 'prop-types';
import Modal from '../Modal';
import { deleteTopicApi, getChatsApi } from '../../apis';
import AuthContext from '../../context';

const DeleteModal = ({ id, titleText, closeModal }) => {
	const { dispatch } = AuthContext();
	const deleteHandler = () => {
		const res = deleteTopicApi(id);
		console.log(res);
		getChatsApi().then((res) => {
			dispatch({
				type: 'GET_CHATS',
				payload: res,
			});
		});
		closeModal();
	};
	return (
		<Modal title="Delete chat?" closeModal={() => closeModal()}>
			<div className="flex flex-col p-4 h-full">
				<div>
					This will delete <b>{titleText}</b>
				</div>
				<div className="grow flex gap-3 flex-row-reverse mt-5">
					<button
						className="bg-rose-700 text-white rounded-lg px-3 py-2 text-sm hover:bg-rose-900"
						onClick={deleteHandler}
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
		</Modal>
	);
};

DeleteModal.propTypes = {
	titleText: PropTypes.string.isRequired,
	closeModal: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
};

export default DeleteModal;
