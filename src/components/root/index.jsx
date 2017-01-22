import React, { Component } from 'react'
import './root.css'
import Countdown from '../countdown/index'

export default class Root extends Component {
  componentDidMount() {
    console.log('props: ')
    console.log(this.props)
    this.props.joinSession(this.props.sessionID)
  }
  render() {
    console.log('sessionID: ' + this.props.sessionID)
	return (
	    <div className='root'>Welcome to LoopChat.
	      <Countdown seconds={10} radius={50}/>
	    </div>
	)
    }
}
