import React, {Component} from  'react'
import {connect} from 'react-redux'
import uuidV4 from 'uuid/v4'
import {map, truncate} from 'lodash'
import {getTimelines} from '../../../../redux/selectors/timelines'
import {createTimeline} from '../../../../redux/actions/timelines/timelines'
import {openTimelineInEditor} from '../../../../redux/actions/ui/timelines'
import styles from '../drawer.css'


const actions = {
  createTimeline,
  openTimelineInEditor,
}

const mapStateToProps = (state, ownProps) => ({
  timelines: getTimelines(state),
})

@connect(mapStateToProps, actions)
export class TimelineSelector extends Component {

  createTimeline() {
    this.props.createTimeline(uuidV4())
  }

  openTimeline(id) {
    console.log('OPENING TIMELINE ', id)

    this.props.openTimelineInEditor(id)
  }
  
  generateTimelineLinks() {
    return map(
      this.props.timelines,
      (timeline, idx) => (
        <span key={idx}>
          |- 
          <span onClick={() => this.openTimeline(timeline.id)}>{truncate(timeline.id, {length: 20})}</span>
          <br/>
        </span>
      )
    )
  }
  
  render() {

    return (
      <div>
        <div className={styles.drawerHeading}>
          <span className={styles.drawerHeadingName}>timelines</span>
          <span className={styles.drawerHeadingAdd} onClick={() => this.createTimeline()}>+</span>
        </div>
        {this.generateTimelineLinks()}
      </div>
    )
  }
}
