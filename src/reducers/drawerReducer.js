const initialState = {
	open: false,
	card: {}
}

export default function reducer(state = initialState, action){
	switch (action.type) {
		case "CLOSE_DRAWER":
			return {
				...state,
				open: false
			}
		case "OPEN_DRAWER":
			return {
				...state,
				open: true,
				card: action.card
			}
		default:
			return state;
	}
}