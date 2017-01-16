import handleWebSocketEvents from './socketEvents'

import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root/index'

ReactDOM.render(<Root />, document.getElementById('root'))

handleWebSocketEvents()
