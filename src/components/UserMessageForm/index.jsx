import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const UserMessageForm = ({ submitHandler }) => {
	const maxTextAreaHeight = 200;
	const textAreaRef = useRef(null);
	const [inputText, setInputText] = useState('');
	const [isTextAreaOverflow, setIsTextAreaOverflow] = useState(false);

	useEffect(() => {
		if (textAreaRef) {
			textAreaRef.current.style.height = '0px';
			const { scrollHeight } = textAreaRef.current;
			textAreaRef.current.style.height = `${scrollHeight}px`;
		}
	}, [textAreaRef, inputText]);

	const changeHandler = (e) => {
		setInputText(e.target.value);
		setIsTextAreaOverflow(e.target.scrollHeight > maxTextAreaHeight);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await submitHandler(e);
		setInputText('');
	};

	return (
		<form className="gap-3 m-auto max-w-3xl" onSubmit={handleSubmit}>
			<div className="border border-gray-300 rounded-2xl flex relative">
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
					className="w-7 h-7 absolute bottom-3 right-3 text-black bg-white disabled:text-gray-400 disabled:bg-black rounded-lg"
					disabled={!inputText}
				>
					&uarr;
				</button>
			</div>
		</form>
	);
};

export default UserMessageForm;

UserMessageForm.propTypes = {
	submitHandler: PropTypes.func.isRequired,
};
