import React, {Component} from 'react'
import {object} from 'prop-types'
import {connect} from 'react-redux'
import {map, values} from 'lodash'
import injectTapEventPlugin from 'react-tap-event-plugin'
import uuidV4 from 'uuid/v4'
import './dashboard.css'
import {Timeline} from '../timeline/timeline'
import {createTimeline} from '../../redux/actions/timelines/timelines'

// we need this for this component to work with AppBar
injectTapEventPlugin()

const actions = {
  createTimeline,
}

const mapStateToProps = (state, { params }) => ({
  inputs: values(state.midi.input),
  timelines: state.timelines,
})

@connect(mapStateToProps, actions)
export class Dashboard extends Component {
  static propTypes = {
    session: object,
  }
  
  constructor(props) {
    super(props)
  }

  createTimeline() {
    this.props.createTimeline(uuidV4())
  }

  renderTimelines() {
    const {timelines} = this.props

    return map(
      this.props.timelines,
      (value, id, key) => (
        <Timeline
          key={key}
          {...value}
          width={800}
          height={200}
          background={'#ffbf75'}
          inputDevices={this.props.inputs}
        />       
      )
    )
  }
  
  render() {
    const iconStyles = {
      width: 40,
      height: 40,
      color: '#ff9694'
    }

    return(
      <div className='dashboard'>
        <button onClick={() => this.createTimeline()}>
          {'+ timeline'}
        </button>
        {this.renderTimelines()}
      </div>
    )
  }
}

