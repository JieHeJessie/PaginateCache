export default function reducer(state = {}, action){
	switch (action.type) {
		case "FETCH_PAGE_FULFILLED":
		case "FETCH_PRE_FULFILLED":
			console.log(action.type + " " + action.index)
            console.log(state);
			return {
				...state, 
				[action.index] : action.cards
			}
		default:
			return state;
	}
}