import { AuthProvider } from './context/auth';
import { ChatProvider } from './context/chat';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';
import { ToastContainer } from 'react-toastify';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import RequireAuth from './components/RequireAuth';
import MainLayout from './layouts/MainLayout';
import TopicPage from './pages/TopicPage';
function App() {
	return (
		<AuthProvider>
			<ChatProvider>
				<ToastContainer position="top-right" />
				<Router>
					<Routes>
						<Route element={<RequireAuth />}>
							<Route path="/" element={<MainLayout />}>
								<Route path="/" element={<HomePage />} exact />
								<Route path="/chats/:id" element={<TopicPage />} />
							</Route>
						</Route>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
					</Routes>
				</Router>
			</ChatProvider>
		</AuthProvider>
	);
}

export default App;
