import { combineReducers } from "redux"
import cache from "./cacheReducer"
import drawer from "./drawerReducer"
import page from "./pageReducer"
import pagination from "./paginationReducer"

export default combineReducers({
  cache,
  drawer,
  page,
  pagination
})
