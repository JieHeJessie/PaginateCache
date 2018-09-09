import axios from "axios"

const URL = (pageIndex) => `https://atr-test-dh1.aiam-dh.com/atr-gateway/ticket-management/api/v1/tickets?ticketType=incident&sortBy=lastUpdateDate&sortDirection=DESC&page=${pageIndex - 1}&perPage=12`;
const API_TOKEN = "eyJhbGciOiJSUzUxMiIsInppcCI6IkRFRiJ9.eNqUlN1qwjAUx1-l5NqLdboPvYttrME2kSbdGDJCtUEK9oN-4ECEvcZeb0-yaGQMBJPdhcMv5_zP_5zkANp-DSYgzYq8BAOQ9lkuy41Uob1cq8CmkWknMzBxH4aPw6fxvTsaD90BqGVT5G2bV2ULJqsDKNPidAn6ESaCIRh7c4FIgAlSSeqmUnyXS8UejsfBLx4j6AuOvQXigtEk9hC7hXuQCORjLmjCGfaRgCKIabI0lphhFKpCKFqGkN9UpBvw5pBPKTeDnNKQmTH7-glDsViGiXLOaAVTri1RHGHGML3GwaYqCll2JxW7XbXPy63Tt7L5_vxqna5yZJZ354DzZ5hOWmbOtqn6ugXXfSjPCcf8zTzTS6sW3hDK8Qx7kKseLAy3T6z3yj6lsSlbpWfYxipdP6IEcxpjEhiTLgh9DZEfoClkZr3Q4_gF_WPt7V-i5q3laNxirTUYwMjeaPOYz5jhT3ofgMvWT1ZahWIgj8XpQV6OOqxI-VHrD3H8PLpzRypQpPlOVQLHHwAAAP__.MLGDb0zXFzWH12IimXMWXRe8btxWDwx1uTCyZY1glNNTs4K6CfKPGRwq1o1rOqG6jY0CWwcRuTMSV_9-Ok4wR0U5YKhPz1YMA3z8pzAfVcg4Rb7qswIv8e38_d_0EgmqWjnVq7jg3zGOa_UocUQebeSwZ9CBg2q-Sne1i_vjyDg";

export function loadPage(pageIndex, cachePages){
	return function(dispatch){
		if(pageIndex in cachePages){
			dispatch({
				type: "SHOW_PAGE",
				index: pageIndex,
				cards: cachePages[pageIndex]
			});
		}else{
			dispatch({
				type: "FETCHING_PAGE"
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
				if(Object.keys(cachePages).length === 0){
					dispatch({
						type: "SET_CARDS_TOTAL",
						total: response.headers["x-total-count"]
					})
				}

				dispatch({
					type: "FETCH_PAGE_FULFILLED",
					currentPage: pageIndex,
					index: pageIndex,
					cards: response.data
				});

				dispatch({
					type: "SHOW_PAGE",
					index: pageIndex,
					cards: response.data
				});
			})
			.catch((err) => {
				console.log(err.response);
			});
		}
	}
}

export function fetchPredPage(predIndex, currentIndex){
	return function(dispatch){
		return axios({
			method: 'get',
			url: URL(predIndex),
			headers: {
				'apiToken': API_TOKEN,
				'Content-Type': "application/json",
				'Accept': "application/json"					
			}
		})
		.then((response) => {
			dispatch({
				type: "FETCH_PAGE_FULFILLED",
				currentPage: currentIndex,
				index: predIndex,
				cards: response.data
			});
		})
		.catch((err) => {
			console.log(err.response);
		});
	}
}