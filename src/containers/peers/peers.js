import React, {Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Avatar from 'material-ui/Avatar'
import './peers.css'

class Peers extends Component {
  render() {
    const peers = this.props.peers.toJS()
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

const mapStateToProps = ({peers}) => ({
  peers
})

export default connect(
  mapStateToProps
)(Peers)
