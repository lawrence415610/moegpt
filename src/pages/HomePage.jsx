import { useState, useRef, useEffect } from 'react';
import Logo from '../assets/logo.png';

const HomePage = () => {
	const maxTextAreaHeight = 200;
	const textAreaRef = useRef(null);
	const [inputText, setInputText] = useState('');
	const [isTextAreaOverflow, setIsTextAreaOverflow] = useState(false);

	const changeHandler = (e) => {
		setInputText(e.target.value);
		setIsTextAreaOverflow(e.target.scrollHeight > maxTextAreaHeight);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		setInputText('');
		console.log({
			inputText,
		});
	};

	useEffect(() => {
		if (textAreaRef) {
			textAreaRef.current.style.height = '0px';
			const { scrollHeight } = textAreaRef.current;
			textAreaRef.current.style.height = `${scrollHeight}px`;
		}
	}, [textAreaRef, inputText]);

	return (
		<div className="flex h-screen w-screen">
			<div className="w-64 bg-black">
				<nav className="px-3 h-full w-full">
					<div className="pt-3.5">
						<a
							className="text-white flex px-2 items-center gap-2 rounded-lg h-10 hover:bg-neutral-800"
							href="/"
						>
							<img className="h-10 w-10" src={Logo} />
							MoeGPT
						</a>
					</div>
				</nav>
			</div>
			<div className="h-full flex-1">
				<main className="w-full h-full flex flex-col">
					<div className="flex flex-1 items-center justify-center flex-col">
						<img className="h-20 w-20 mb-3" src={Logo} />
						<div className="text-2xl  font-medium mb-4">How can I help you today?</div>
					</div>
					<div className="w-full pt-2">
						<form className="gap-3 m-auto max-w-3xl" onSubmit={submitHandler}>
							<div className="bg-white border border-gray-300 rounded-2xl flex relative">
								<textarea
									placeholder="Message MoeGPT..."
									rows={1}
									className="w-full resize-none bg-transparent py-3.5 px-10 focus:outline-0"
									ref={textAreaRef}
									style={{
										maxHeight: `${maxTextAreaHeight}px`,
										overflow: `${isTextAreaOverflow ? '' : 'hidden'}`,
									}}
									onChange={changeHandler}
									value={inputText}
								></textarea>
								<button
									className="w-7 h-7 absolute bottom-3 right-3 text-white bg-black rounded-lg disabled:text-gray-400 disabled:bg-white"
									disabled={!inputText}
								>
									&uarr;
								</button>
							</div>
							<footer className="text-center text-xs text-gray-600 px-2 py-2">
								MoeGPT can make mistakes. Consider checking important information.
							</footer>
						</form>
					</div>
				</main>
			</div>
		</div>
	);
};

export default HomePage;
