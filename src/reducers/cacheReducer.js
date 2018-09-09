const MAX_PAGE_NUM = 8;

const initialState = {
	timestamps: {},
	pages: {}
}

const removeOld = (state) => {
	if(Object.keys(state.pages).length >= MAX_PAGE_NUM){
		var removeIndex = -1;
		var minTimestamp = new Date().getTime();
		Object.keys(state.timestamps).forEach((index, timestamp) => {
			if(timestamp < minTimestamp){
				removeIndex = index;
				minTimestamp = timestamp;
			} 
		})
		if(removeIndex > 0){
			console.log(`Remove page ${removeIndex} from cache`)
			delete state.pages[removeIndex]
			delete state.timestamps[removeIndex]
		}
	}
}

const updateTimestamp = (state, index) => {
	state.timestamps[index] = new Date().getTime();
}

const addNew = (state, pageIndex, newPage) => {
	console.log(`Add page ${pageIndex} to cache`)
	state.timestamps[pageIndex] = new Date().getTime();
	state.pages[pageIndex] = newPage;
}

export default function reducer(state = initialState, action){
	window.cache = state;
	switch (action.type) {
		case "FETCH_PAGE_FULFILLED":
		case "FETCH_PRE_FULFILLED":{
			removeOld(state);
			addNew(state, action.index, action.cards)
			return {...state};
		}
		case "UPDATE_TIMESTAMP":{
			updateTimestamp(state, action.index);
			return {...state};
		}
		default:
			return state;
	}
}