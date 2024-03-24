import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getCurrentUserApi } from '../../apis';
function RequireAuth() {
	const [ok, setOk] = useState(false);
	const [loading, setLoading] = useState(true);
	const fetchUser = async () => {
		try {
			setLoading(true);
			const data = await getCurrentUserApi();
			if (data.ok) {
				setOk(true);
			}
		} catch (err) {
			setOk(false);
			throw new Error('Error happens when trying to get current user, Error Msg: ' + err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return ok ? <Outlet /> : <Navigate to="/login" />;
}

export default RequireAuth;
