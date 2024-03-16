import AuthContext from '../../context/auth';
import PropTypes from 'prop-types';

const Avatar = ({ src }) => {
	const { state } = AuthContext();
	const user = state.user;
	const usernameInitial = src ? null : user.username[0];
	return (
		<>
			{src && (
				<div className="h-8 w-8 rounded-full overflow-hidden ">
					<img src={src} />
				</div>
			)}
			{!src && (
				<div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center">
					<span className="text-white uppercase">{usernameInitial}</span>
				</div>
			)}
		</>
	);
};

Avatar.propTypes = {
	src: PropTypes.string || null,
};

export default Avatar;
