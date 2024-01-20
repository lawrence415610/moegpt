const ChatRecord = ({ profile, user, text }) => {
	return (
		<div className="flex mx-auto max-w-3xl gap-3 py-2">
			<div className="flex flex-shrink-0 flex-col ">
				<img className="h-6 w-6" src={profile} />
			</div>
			<div className="flex flex-col w-full">
				<div className="font-semibold">{user}</div>
				<div>{text}</div>
			</div>
		</div>
	);
};

export default ChatRecord;
