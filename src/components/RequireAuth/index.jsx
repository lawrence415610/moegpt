import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children }) {
	const token = Cookies.get('token');
	return token ? children : <Navigate to="/login" />;
}

RequireAuth.propTypes = {
	children: PropTypes.node.isRequired,
};

export default RequireAuth;
