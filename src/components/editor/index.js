import React, { Component } from 'react'
import {connect} from 'react-redux'
import {array, bool, number, object, shape, string} from 'prop-types'
import {get, map} from 'lodash'
import {InputControlPanel} from './panels/input/control'
import {OutputControlPanel} from './panels/output/control'
import {Timeline} from './panels/timeline'
import {TimelineControlPanel} from './panels/timeline/control'
import {ProcessingControlPanel} from './panels/processing'
import styles from './index.css'


// const actions = {}

// const mapStateToProps = (state, ownProps) => ({
//   ...get(state, `timelines.${ownProps.id}`, {}),
//   ...get(state, `ui.timelines.${ownProps.id}`, {}),
//   tracks: getTracksFromTimeline(state, ownProps.id),
// })

// @connect(mapStateToProps, actions)
export class Editor extends Component {
  static propTypes = {
    snippetId: string.isRequired,
    layout: shape({
      width: number,
      height: number,
      background: string,
    })
  }

  static defaultProps = {
    layout: {
      width: 900,//1400,
      height: 300,
      background: '#ffbf75',
    }

  }
  
  constructor(props) {
    super(props)
  }

  getPanelLayouts() {
    // TODO (cw|10.25.2017) extract these values into a better location
    const inputWidthPercent = 0.2
    const outputWidthPercent = 0.1
    const timelineControlHeightPercent = 0.10
    const processingHeightPercent = 0.2
    const timeAxisHeightPercent = 0.1 // TODO (cw|10.25.2017) this needs to be consistent with the value used within TimeAxis
    
    const width = window.innerWidth * (parseFloat(styles.width) / 100)
    const height = parseFloat(styles.height)
    
    const inputControlPanel = {x:0, y:0, width: width * inputWidthPercent, height: height * (1 - (processingHeightPercent + timelineControlHeightPercent)), yOffset: height * timeAxisHeightPercent * (1 - (processingHeightPercent + timelineControlHeightPercent))}
    const outputControlPanel = {x:width * 0.85, y:0, width: width * outputWidthPercent, height: height * (1 - (processingHeightPercent + timelineControlHeightPercent))}
    const timeline = {x: inputControlPanel.width, y:0, width: width * 0.70, height: height * (1 - (processingHeightPercent + timelineControlHeightPercent))}
    const timelineControlPanel = {x: 0, y: height * (1 - (processingHeightPercent + timelineControlHeightPercent)), width, height: height * timelineControlHeightPercent}
    const processingControlPanel = {x: 0, y: height * (1 - (processingHeightPercent + timelineControlHeightPercent)) + timelineControlPanel.height, width, height: height * processingHeightPercent}
    
    return {
      inputControlPanel,
      timeline,
      outputControlPanel,
      timelineControlPanel,
      processingControlPanel,
    }
  }
  
  render() {
    const {width, height} = this.props.layout
    const {snippetId} = this.props
    const layout = this.getPanelLayouts()

    console.log(styles)
    
    return (
      <div className={styles.timelineEditor}>
        <InputControlPanel layout={layout.inputControlPanel} id={snippetId}/>
        <Timeline layout={layout.timeline} id={snippetId}/>
        <OutputControlPanel layout={layout.outputControlPanel} id={snippetId}/>
        <TimelineControlPanel layout={layout.timelineControlPanel} timelineId={snippetId}/>
        <ProcessingControlPanel layout={layout.processingControlPanel} id={snippetId}/>
      </div>
    )
  }
}

// <div className={`timeline-editor`} style={{...styles}}>
