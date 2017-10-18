import React, {Component} from 'react'
import {connect} from 'react-redux'
import {array, bool, number, object, string} from 'prop-types'


const actions = {}

const mapStateToProps = (state, ownProps) => ({})

@connect(mapStateToProps, actions)
export class AudioTrack extends Component {
  static propTypes = {
    id: string.isRequired,
    type: string.isRequired,
    view: object.isRequired,
    timeInterval: object.isRequired,
    trackCount: number.isRequired,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {id} = this.props

    return (
      <g className={`track-${id}`}>
      </g>
    )
  }
}
