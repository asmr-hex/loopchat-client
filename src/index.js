import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import Root from './components/root/index'
import Session from './containers/session'
import socketMiddleware from './middleware/socket'

let store = createStore(reducers,
                        applyMiddleware(thunk, socketMiddleware))

// TOD (cw|1.20.2017) does this route pickup the case with no sessionID?
render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Session}/>
      <Route path="/:sessionID" component={Session}/>
    </Router>
  </Provider>,
  document.getElementById('root')
)


// TODO (cw|1.20.2017) use redux-thunk for persistent websocket connection: https://exec64.co.uk/blog/websockets_with_redux/
// TODO (cw|1.20.2017) use material-ui: https://github.com/callemall/material-ui
