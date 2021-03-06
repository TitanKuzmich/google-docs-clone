import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"

import app from 'state/reducers/app'
import document from 'state/reducers/document'

const composeEnhancers = composeWithDevTools({
  name: "Template"
})

const reducer = combineReducers({
  app,
  document
})


const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store