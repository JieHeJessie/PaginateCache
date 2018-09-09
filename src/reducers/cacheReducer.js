const MAX_PAGE_NUM = 8;

const removeFurthese = (state, currentPage) => {
	if(Object.keys(state).length >= MAX_PAGE_NUM){
		var removeIndex = -1;
		var distance = 0;
		Object.keys(state).forEach((pageIndex, _) => {
			if(Math.abs(pageIndex - currentPage) > distance){
				removeIndex = pageIndex;
				distance = Math.abs(pageIndex - currentPage);
			} 
		})
		if(removeIndex > 0){
			delete state[removeIndex]
		}
	}
}

export default function reducer(state = {}, action){
	switch (action.type) {
		case "FETCH_PAGE_FULFILLED":{
			removeFurthese(state, action.currentPage);
			return {
				...state,
				[action.index] : action.cards
			};
		}
		default:
			return state;
	}
}