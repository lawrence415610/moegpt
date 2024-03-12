import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signupApi } from '../apis';
import AuthContext from '../context';

const SignupPage = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [confirmPasswordError, setConfirmPasswordError] = useState(null);
	const [isDisabled, setIsDisabled] = useState(true);
	const { state } = AuthContext();
	const { user } = state;
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

	const confirmPasswordHandler = (e) => {
		const input = e.target.value;
		setConfirmPassword(input);
		if (input !== password) {
			setConfirmPasswordError('Password must match!');
		} else {
			setConfirmPasswordError(null);
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		if (isDisabled) return;
		try {
			const data = await signupApi({ email, password });
			if (data.ok) {
				toast.success('Signup successfully!');
			}
			setEmail('');
			setPassword('');
			navigate('/');
		} catch (err) {
			toast.error(err.response.data);
			throw new Error('Error happens when trying to signup, Error Msg: ' + err);
		}
	};

	useEffect(() => {
		if (emailError || passwordError || confirmPasswordError) {
			setIsDisabled(true);
		} else {
			setIsDisabled(false);
		}
		// use this after logout feature is implemented
		if (user !== null) {
			navigate('/');
		}
	}, [emailError, passwordError, confirmPasswordError, user, navigate]);

	return (
		<main className="flex items-center justify-center bg-dark-blue h-screen body-font text-black">
			<div className="max-w-lg rounded-md bg-slate-100 w-full p-10">
				<h1 className="big-title-font select-none mb-10 text-black">Sign up</h1>
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
					<div className="flex justify-around items-center">
						<label className="min-w-16" htmlFor="password">
							Confirm
						</label>
						<div>
							<input
								className={`input-field ${
									confirmPasswordError
										? 'focus:border-red-500 border-red-500'
										: ''
								}`}
								onChange={confirmPasswordHandler}
								value={confirmPassword}
								type="password"
								id="confirmpassword"
							/>
							<p className="text-red-500 text-xs mt-2 max-w-56">
								{!!confirmPasswordError && confirmPasswordError}
							</p>
						</div>
					</div>
					<button
						className={`text-white primary-btn w-32 self-center ${
							isDisabled ? 'bg-stone-400 hover:bg-stone-400 cursor-not-allowed' : ''
						}`}
						disabled={isDisabled}
						type="submit"
					>
						Sign up
					</button>
				</form>
				<p className="text-center mt-3">
					Don&apos;t have an account? Please{' '}
					<Link to="/login" className="text-emerald-500 hover:underline">
						Log in
					</Link>
				</p>
			</div>
		</main>
	);
};

export default SignupPage;
