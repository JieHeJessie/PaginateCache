export default function reducer(state = {}, action){
	switch (action.type) {
		case "FETCH_PAGE_FULFILLED":
		case "FETCH_PRE_FULFILLED":
			return {
				...state, 
				[action.index] : action.cards
			}
		default:
			// statements_def
			return state;
	}
}