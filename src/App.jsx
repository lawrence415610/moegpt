import './App.css';
import { useState } from 'react';
import { AuthProvider } from './context/auth';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import RequireAuth from './components/RequireAuth';
import Sidebar from './layouts/Sidebar';
import { ChatProvider } from './context/chats';
function App() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<AuthProvider>
			<ToastContainer position="top-right" />
			<Router>
				<Routes>
					<ChatProvider>
						<Route element={<RequireAuth />}>
							<Route path="/" element={<Sidebar isSidebarOpen={isSidebarOpen} />}>
								<Route
									path="/"
									element={
										<HomePage
											isSidebarOpen={isSidebarOpen}
											sidebarHandler={toggleSidebar}
										/>
									}
									exact
								/>
								{/* <Route path="/chats/:id" element={<ChatsPage />} /> */}
							</Route>
						</Route>
					</ChatProvider>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
