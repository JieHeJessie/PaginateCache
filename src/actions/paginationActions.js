import axios from "axios"

const URL = (pageIndex) => `https://atr-test-dh1.aiam-dh.com/atr-gateway/ticket-management/api/v1/tickets?ticketType=incident&sortBy=lastUpdateDate&sortDirection=DESC&page=${pageIndex - 1}&perPage=12`;
const API_TOKEN = "";


export function loadPage(pageIndex, cachePages){
	console.log('in action')
	return function(dispatch){
		console.log('in dispatch')
		if(pageIndex in cachePages){
			dispatch({
				type: "SHOW_PAGE",
				index: pageIndex,
				cards: cachePages[pageIndex]
			});
		}else{
			dispatch({
				type: "FETCHING_PAGE",
				info: pageIndex
			});

			return axios({
				method: 'get',
				url: URL(pageIndex),
				headers: {
					'apiToken': API_TOKEN,
					'Content-Type': "application/json",
					'Accept': "application/json"					
				}
			})
			.then((response) => {

				dispatch({
					type: "FETCH_PAGE_FULFILLED",
					index: pageIndex,
					cards: response.data
				});

				dispatch({
					type: "SHOW_PAGE",
					info: response.data
				});

				if(Object.keys(cachePages).length === 0){
					dispatch({
						type: "SET_CARDS_TOTAL",
						total: response.headers["x-total-count"]
					})
				}
			})
			.catch((err) => {
				console.log(err.response);
			});
		}
	}
}

export function fetchPages(pageIndexes, cachePages){
	return function(dispatch){
		for (var i = 0; i < pageIndexes.length; i++) {
			if (!(pageIndexes[i] in cachePages)) {
				axios({
					method: 'get',
					url: URL(pageIndexes[i]),
					headers: {
						'apiToken': API_TOKEN,
						'Content-Type': "application/json",
						'Accept': "application/json"					
					}
				})
				.then((response) => {
					dispatch({
						type: "FETCH_PRE_FULFILLED",
						index: pageIndexes[i],
						cards: response.data
					});
				})
				.catch((err) => {
					console.log(err.response);
				});

			}
		}
	}

} 

