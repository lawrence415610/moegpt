import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import { auth } from '../../firebase/index';

const Message = ({ user, text }) => {
	const currentUser = auth.currentUser;
	return (
		<div className="flex mx-auto max-w-3xl gap-3 py-2">
			<div className="flex flex-shrink-0 flex-col">
				{user === 'You' && <Avatar src={currentUser.photoURL} />}
				{user === 'MoeGPT' && <img className="h-8 w-8 rounded-full" src="/logo.png" />}
			</div>
			<div className="flex flex-col w-full">
				<div className="font-semibold">{user}</div>
				<div>{text}</div>
			</div>
		</div>
	);
};

Message.propTypes = {
	user: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
};

export default Message;
