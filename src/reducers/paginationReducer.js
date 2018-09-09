const initialState = {
	currentPage: 1,
	totalPages: 1
}

export default function reducer(state = initialState, action){
	window.pagination = state;
	switch (action.type) {
		case "SET_CARDS_TOTAL":
			return{
				...state,
				totalPages: Math.ceil(action.total/12)
			}
		case "SHOW_PAGE":
			return{
				...state,
				currentPage: action.index
			}
		default:
			return state;
	}
}