import AuthContext from '../../hooks/useAuth';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children }) {
	const { user } = AuthContext();
	return user ? children : <Navigate to="/login" />;
}

RequireAuth.propTypes = {
	children: PropTypes.node.isRequired,
};

export default RequireAuth;
