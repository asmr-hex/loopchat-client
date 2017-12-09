import React, {Component} from 'react'
import {object, string} from 'prop-types'
import {MidiTrack} from './midi'
import {AudioTrack} from './audio'


export class Track extends Component {
  static propTypes = {
    id: string.isRequired,
    type: string.isRequired,
    timelineId: string.isRequired,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {type} = this.props
    return type == 'midi' ? <MidiTrack {...this.props}/> : <AudioTrack {...this.props}/>
  }
}
