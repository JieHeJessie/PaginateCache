import { combineReducers } from "redux"
import cache from "./cacheReducer"
import page from "./pageReducer"
import pagination from "./paginationReducer"

export default combineReducers({
  cache,
  page,
  pagination
})
