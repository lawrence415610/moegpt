import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const topicContext = createContext();
const rootReducer = (state, action) => {
	switch (action.type) {
		case 'GET_TOPICS':
			return { ...state, topics: action.payload };
		case 'ADD_TOPIC':
			return { ...state, topics: [...state.topics, action.payload] };
		case 'UPDATE_TOPIC':
			return {
				...state,
				topics: state.topics.map((topic) =>
					topic.id === action.payload.id ? action.payload : topic
				),
			};
		default:
			return state;
	}
};
const initialState = {
	topics: [],
};

export const TopicProvider = ({ children }) => {
	const [state, dispatch] = useReducer(rootReducer, initialState);

	return (
		<topicContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</topicContext.Provider>
	);
};

export default function TopicContext() {
	const context = useContext(topicContext);
	if (!context) throw new Error('use TopicContext must be used within TopicProvider');
	return context;
}

TopicProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
