import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import appReducers from './reducers'
import Root from './components/root/index'
import handleWebSocketEvents from './socketEvents'

let store = createStore(appReducers)

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Root}/>
    </Router>
  </Provider>,
  document.getElementById('root')
)

handleWebSocketEvents()








