import React, {Component} from 'react'
import {number, shape, string} from 'prop-types'


export class OutputControlPanel extends Component {
  static propTypes = {
    id: string.isRequired,
    layout: shape({
      x: number.isRequired,
      y: number.isRequired,
      width: number.isRequired,
      height: number.isRequired,
    }).isRequired
  }
  
  render() {
    const {id} = this.props
    const styles = {
      width: this.props.layout.width,
      height: this.props.layout.height,
      left: this.props.layout.x,
      top: this.props.layout.y,
      backgroundColor: 'purple',
    }

    
    return (
      <div className={`output-control-panel-${id}`} style={{...styles}}>
        output
      </div>
    )
  }
}
