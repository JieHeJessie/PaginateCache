const initialState = {
	fetching: true,
	cards: []
}

export default function reducer(state = initialState, action){
	window.page = state;
	switch (action.type) {
		case "FETCHING_PAGE":{
			return {
				...state,
				fetching: true
			}
		}
		case "SHOW_PAGE":
			return {
				...state,
				fetching: false,
				cards: action.cards
			}
		default:
			return state;
	}
}