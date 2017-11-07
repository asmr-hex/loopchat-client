import React, {Component} from 'react'
import Drawer from 'material-ui/Drawer'
import {TimelineSelector} from './timelineSelector'


export class ProjectBar extends Component {
  render() {

    
    
    return (
      <Drawer open={true}>
        <TimelineSelector/>
      </Drawer>
    )
  }
}
