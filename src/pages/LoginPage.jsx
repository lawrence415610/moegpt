import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../hooks/useAuth';

const LoginPage = () => {
	const navigate = useNavigate();
	const { login } = AuthContext();

	const [email, setEmail] = useState('test@test.com');
	const [password, setPassword] = useState('Test1234');
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [isDisabled, setIsDisabled] = useState(true);
	const emailRegex = /^[a-zA-Z0-6._%+-]+@[a-zA-Z0-6.-]+\.[a-zA-Z]{2,}$/;
	const passwordRegex = /^(?=.*[a-z])(?=.*\d).{8,}$/;

	const emailHandler = (e) => {
		const input = e.target.value;
		setEmail(input);
		if (!input.match(emailRegex)) {
			setEmailError('Please input valid email address!');
		} else {
			setEmailError(null);
		}
	};

	const passwordHandler = (e) => {
		const input = e.target.value;
		setPassword(input);
		if (!input.match(passwordRegex)) {
			setPasswordError('Password must contain at least 8 characters, 1 letter and 1 number!');
		} else {
			setPasswordError(null);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (isDisabled) return;
		login({
			email,
			password,
		}).then(() => {
			console.log('logged in successfully');
			navigate('/');
		});
	};

	useEffect(() => {
		if (emailError || passwordError) {
			setIsDisabled(true);
		} else {
			setIsDisabled(false);
		}
	}, [emailError, passwordError]);

	return (
		<main className="flex items-center justify-center bg-dark-blue h-screen body-font">
			<div className="max-w-lg rounded-md bg-slate-100 w-full p-10">
				<h1 className="big-title-font select-none mb-10">Log in</h1>
				<form onSubmit={submitHandler} className="flex flex-col justify-start gap-8">
					<div className="flex justify-around items-center">
						<label className="min-w-16" htmlFor="email">
							Email
						</label>
						<div>
							<input
								className={`input-field ${
									emailError ? 'focus:border-red-500 border-red-500' : ''
								}`}
								value={email}
								onChange={emailHandler}
								id="email"
							/>
							<p className="text-red-500 text-xs mt-2 max-w-">
								{!!emailError && emailError}
							</p>
						</div>
					</div>
					<div className="flex justify-around items-center">
						<label className="min-w-16" htmlFor="password">
							Password
						</label>
						<div>
							<input
								className={`input-field ${
									passwordError ? 'focus:border-red-500 border-red-500' : ''
								}`}
								onChange={passwordHandler}
								value={password}
								type="password"
								id="password"
							/>
							<p className="text-red-500 text-xs mt-2 max-w-56">
								{!!passwordError && passwordError}
							</p>
						</div>
					</div>
					<button
						className={`primary-btn w-32 self-center ${
							isDisabled ? 'bg-stone-400 hover:bg-stone-400 cursor-not-allowed' : ''
						}`}
						disabled={isDisabled}
						type="submit"
					>
						Log in
					</button>
				</form>
				<p className="text-center mt-3">
					Don&apos;t have an account? Please{' '}
					<Link to="/signup" className="text-emerald-500 hover:underline">
						Sign up
					</Link>
				</p>
			</div>
		</main>
	);
};

export default LoginPage;
