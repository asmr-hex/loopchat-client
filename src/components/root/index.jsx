import React, { Component } from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import './root.css'
import Countdown from '../countdown/index'

export default class Root extends Component {
  componentDidMount() {
    this.props.joinSession(this.props.sessionID)
  }
  
  render() {
    const loading = this.props.connected ? 'hide':'loading'
    return (
      <div className='root'>Welcome to LoopChat.
        <RefreshIndicator
          top={window.innerHeight/2}
          left={window.innerWidth/2}
          style={{backgroundColor:'#FFF59D'}}
          status={loading}
          size={100}
          loadingColor={'#80DEEA'}
          zDepth={0}/>
        <Countdown seconds={10} radius={50}/>
      </div>

    )
  }
}









