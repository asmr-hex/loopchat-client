import React, {Component} from 'react'
import {connect} from 'react-redux'
import Drawer from 'material-ui/Drawer'
import {TimelineSelector} from './timelineSelector'
import {InstrumentSelector} from './instrumentSelector'
import {SearchBar} from './search'
import {headerHeight} from '../../header/header.css'
import {midGrey, lightGrey} from '../../../styles/palette.css'
import {isProjectDrawerOpen} from '../../../redux/selectors/workspaces'


const actions = {}
const mapStateToProps = (state, ownProps) => ({
  open: isProjectDrawerOpen(state),
})

@connect(mapStateToProps, actions)
export class ProjectBar extends Component {
  render() {

    const containerStyle = {
      height: `calc(100% - ${headerHeight})`,
      top: headerHeight,
      backgroundColor: midGrey,
      color: lightGrey,
    }
    
    return (
      <Drawer open={this.props.open} containerStyle={containerStyle}>
        <SearchBar/>
        <TimelineSelector/>
        <InstrumentSelector/>
      </Drawer>
    )
  }
}
