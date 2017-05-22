import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import './peers.css'


const mapStateToProps = state => ({
  peers: state.peers,
})

@connect(mapStateToProps)
export default class Peers extends Component {
  render() {
    const peers = this.props.peers
    const avatars = peers.map((peer, i) => {
      return (
        <Avatar className='peer' key={i}>
          {peer.name[0]}
        </Avatar>
      )
    })
    return (
      <div className='peer-list'>
        {avatars}
      </div>
    )
  }
}
