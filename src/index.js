import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import reducers from './redux/reducers'
import Session from './components/session'
import socketMiddleware from './middleware/websocket/websocket'
import { setupMIDI } from './middleware/midi'
import {midiMiddleware} from './middleware/midi/index'
import {composeWithDevTools} from 'redux-devtools-extension'
import './styles/main.css'
import {wwvvMuiTheme} from './styles/muiTheme'


// setup redux store
let store = createStore(
  reducers,
  composeWithDevTools( // TODO (cw|5.23.2017) parameterize when we are wrapping the store in the redux dev tools extension
    applyMiddleware(thunk, socketMiddleware, midiMiddleware),
  )
)

render(
  <MuiThemeProvider muiTheme={wwvvMuiTheme}>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/(:sessionID)" component={Session}/>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)

// TODO (cw|1.22.2017) possibly use CSS Modules as opposed to inline styling

