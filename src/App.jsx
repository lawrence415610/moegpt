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
import Sidebar from './layouts/Sidebar';
import TopicPage from './pages/TopicPage';
function App() {
	return (
		<AuthProvider>
			<ToastContainer position="top-right" />
			<Router>
				<Routes>
					<Route element={<RequireAuth />}>
						<Route path="/" element={<Sidebar />}>
							<Route path="/" element={<HomePage />} exact />
							<Route path="/chats/:id" element={<TopicPage />} />
						</Route>
					</Route>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
