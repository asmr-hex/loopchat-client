import React, { Component } from 'react'
import './root.css'
import Countdown from '../countdown/index'

export default class Root extends Component {
  componentDidMount() {
    this.props.joinSession(this.props.sessionID)
  }
  
  render() {
	return (
	    <div className='root'>Welcome to LoopChat.
	      <Countdown seconds={10} radius={50}/>
	    </div>
	)
    }
}
