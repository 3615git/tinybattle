import { createStore } from "redux"
import rootReducer from "../reducers/index"
import { loadState } from "../localStorage/index"

const persistedState = loadState()

const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store