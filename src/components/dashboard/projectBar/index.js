import React, {Component} from 'react'
import Drawer from 'material-ui/Drawer'
import {TimelineSelector} from './timelineSelector'
import {InstrumentSelector} from './instrumentSelector'


export class ProjectBar extends Component {
  render() {

    return (
      <Drawer open={true}>
        <TimelineSelector/>
        <InstrumentSelector/>
      </Drawer>
    )
  }
}
