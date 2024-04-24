import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { auth } from '../../firebase/index';
import { onAuthStateChanged } from 'firebase/auth';

function RequireAuth() {
	const [ok, setOk] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setOk(true);
			} else {
				setOk(false);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return ok ? <Outlet /> : <Navigate to="/login" />;
}

export default RequireAuth;
