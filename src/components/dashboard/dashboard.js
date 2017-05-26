import React, {Component} from 'react'
import {connect} from 'react-redux'
import {values} from 'lodash'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './dashboard.css'
import {Timeline} from '../timeline/timeline'

// we need this for this component to work with AppBar
injectTapEventPlugin()


const mapStateToProps = (state, { params }) => ({
  inputs: values(state.midiDevices),
})

@connect(mapStateToProps)
export class Dashboard extends Component {
  render() {
    const iconStyles = {
      width: 40,
      height: 40,
      color: '#ff9694'
    }
    return(
      <div className='dashboard'>
        <Timeline
          width={800}
          height={200}
          background={'#f195c8'}
          inputs={this.props.inputs}
        />
      </div>
    )
  }
}

