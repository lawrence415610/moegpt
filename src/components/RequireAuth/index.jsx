import axios from 'axios';
import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function RequireAuth() {
	const [ok, setOk] = useState(false);
	const [loading, setLoading] = useState(true);
	const fetchUser = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get('http://localhost:5555/api/current-user', {
				withCredentials: true,
				credentials: 'include',
			});

			if (data.ok) {
				setOk(true);
			}
		} catch (err) {
			console.log(err);
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
