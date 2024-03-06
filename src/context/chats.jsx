import { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

const chatContext = createContext();
const initialState = {
	chats: [],
};

const chatReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_CHAT':
			return { ...state, chats: [...state.chats, action.payload] };
		default:
			return state;
	}
};

export const ChatProvider = ({ children }) => {
	const [state, dispatch] = useReducer(chatReducer, initialState);
	return <chatContext.Provider value={{ state, dispatch }}>{children}</chatContext.Provider>;
};

export default function ChatContext() {
	const context = useContext(chatContext);
	if (!context) {
		throw new Error('ChatContext must be used within ChatProvider');
	}
	return context;
}

ChatProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
