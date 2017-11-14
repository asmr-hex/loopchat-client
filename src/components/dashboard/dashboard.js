import React, {Component} from 'react'
import {object} from 'prop-types'
import {connect} from 'react-redux'
import {keys, map, values} from 'lodash'
import injectTapEventPlugin from 'react-tap-event-plugin'
import uuidV4 from 'uuid/v4'
import './dashboard.css'
import {Editor} from '../editor'
import {ProjectBar} from './projectBar'
import {createTimeline} from '../../redux/actions/timelines/timelines'

// we need this for this component to work with AppBar
injectTapEventPlugin()

const actions = {
  createTimeline,
}

const mapStateToProps = (state, { params }) => ({
  inputs: values(state.midi.input),
  visibleTimelines: state.timelines.visible,
})

@connect(mapStateToProps, actions)
export class Dashboard extends Component {
  static propTypes = {
    session: object,
  }
  
  constructor(props) {
    super(props)
  }

  // createTimeline() {
  //   this.props.createTimeline(uuidV4())
  // }

  // renderTimelines() {
  //   const {timelines} = this.props

    
  //   return map(
  //     this.props.visibleTimelines,
  //     (value, id, key) => (
  //       <Timeline
  //         key={key}
  //         {...timelines[value.id]} // DEBUGGING THIS
  //         width={800}
  //         height={200}
  //         background={'#ffbf75'}
  //         inputDevices={this.props.inputs}
  //         timeInterval={{start: 0, end: 60}}
  //       />       
  //     )
  //   )
  // }

  renderTimelineEditor() {
    const {visibleTimelines} = this.props
    const ids = visibleTimelines
    
    if (ids.length === 0) return

    return (
      <Editor snippetId={ids[0]}/>
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
        <ProjectBar/>
        <button onClick={() => this.createTimeline()}>
          {'Edit New Timeline'}
        </button>
        {this.renderTimelineEditor()}
      </div>
    )
  }
}

