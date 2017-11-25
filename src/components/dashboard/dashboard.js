import React, {Component} from 'react'
import {object} from 'prop-types'
import {connect} from 'react-redux'
import {keys, map, values} from 'lodash'
import injectTapEventPlugin from 'react-tap-event-plugin'
import uuidV4 from 'uuid/v4'
import './dashboard.css'
import {Editor} from '../editor'
import {Workshop} from '../workshop'
import {ProjectBar} from './projectBar'
import {createTimeline} from '../../redux/actions/timelines/timelines'
import {getActiveWorkspace} from '../../redux/selectors/workspaces'
import {getOpenInstruments} from '../../redux/selectors/instruments'
import {
  INSTRUMENT_WORKSPACE,
  EDITOR_WORKSPACE,
  HOME_WORKSPACE,
} from '../../types/workspace'


// we need this for this component to work with AppBar
injectTapEventPlugin()

const actions = {
  createTimeline,
}

const mapStateToProps = (state, { params }) => ({
  inputs: values(state.midi.input),
  visibleTimelines: state.timelines.visible,
  activeWorkspace: getActiveWorkspace(state),
  openInstruments: getOpenInstruments(state),
})

@connect(mapStateToProps, actions)
export class Dashboard extends Component {
  static propTypes = {
    session: object,
  }
  
  constructor(props) {
    super(props)
  }

  renderTimelineEditor() {
    const {visibleTimelines} = this.props
    const ids = visibleTimelines
    
    if (ids.length === 0) return

    return (
      <Editor snippetId={ids[0]}/>
    )
  }

  renderInstrumentWorkshop() {
    const {openInstruments} = this.props

    console.log(openInstruments)
    
    if (keys(openInstruments).length === 0) return

    return (
      <Workshop instrumentId={openInstruments[0]}/>
    )
  }

  renderCurrentWorkspace() {
    const {activeWorkspace} = this.props
    
    switch(activeWorkspace) {
    case INSTRUMENT_WORKSPACE:
      return this.renderInstrumentWorkshop()
    case EDITOR_WORKSPACE:
      return this.renderTimelineEditor()
    default:
      return
    }
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
        {this.renderCurrentWorkspace()}
      </div>
    )
  }
}

