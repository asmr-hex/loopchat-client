import React, { Component } from 'react'
import './root.css'
import Countdown from '../countdown/index'

export default class Root extends Component {
    render() {
	return (
	    <div className='root'>Welcome to LoopChat.
		<Countdown seconds={5} radius={100}/>
	    </div>
	)
    }
}
