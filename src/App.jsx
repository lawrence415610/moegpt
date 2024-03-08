import './App.css';
import { AuthProvider } from './context';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import RequireAuth from './components/RequireAuth';
function App() {
	return (
		<AuthProvider>
			<ToastContainer position="top-right" />
			<Router>
				<Routes>
					<Route element={<RequireAuth />}>
						<Route path="/" element={<HomePage />} exact />
					</Route>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
