export function close(){
	return function(dispatch){
		dispatch({type : "CLOSE_DRAWER"});
	}
}

export function open(card){
	return function(dispatch){
		dispatch({
			type : "OPEN_DRAWER",
			card : card
		});
	}
}
