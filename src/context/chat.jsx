import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const chatContext = createContext();
const rootReducer = (state, action) => {
	const newTopics = state.chats.map((chat) => {
		if (chat.id === action.payload._id) {
			return action.payload;
		}
		return chat;
	});
	switch (action.type) {
		case 'GET_CHATS':
			return { ...state, chats: action.payload };
		case 'ADD_CHAT':
			return { ...state, chats: newTopics };
		default:
			return state;
	}
};
const initialState = {
	chats: [],
};

export const ChatProvider = ({ children }) => {
	const [state, dispatch] = useReducer(rootReducer, initialState);

	return (
		<chatContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</chatContext.Provider>
	);
};

export default function ChatContext() {
	const context = useContext(chatContext);
	if (!context) throw new Error('use ChatContext must be used within ChatProvider');
	return context;
}

ChatProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
