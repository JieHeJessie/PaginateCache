const initialState = {
	lastPage: 0,
	currentPage: 1,
	totalPages: 1
}

export default function reducer(state = initialState, action){
	switch (action.type) {
		case "SET_CARDS_TOTAL":
			return{
				...state,
				totalPages: Math.ceil(action.total/12)
			}
		case "SHOW_PAGE":
			return{
				...state,
				lastPage: state.currentPage == action.index ? state.lastPage : state.currentPage,
				currentPage: action.index
			}
	}
	return state;
}