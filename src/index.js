import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import reducers from './reducers'
import Root from './components/root/index'
import Session from './containers/session'
import socketMiddleware from './middleware/socket'

let store = createStore(reducers,
                        applyMiddleware(thunk, socketMiddleware))


render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Session}/>
        <Route path="/:sessionID" component={Session}/>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)

// TODO (cw|1.22.2017) possibly use CSS Modules as opposed to inline styling
