
const { createStore, combineReducers, compose } = Redux

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(composeEnhancers())
window.gStore = store