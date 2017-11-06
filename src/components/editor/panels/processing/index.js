import React, {Component} from 'react'
import {number, shape, string} from 'prop-types'


export class ProcessingControlPanel extends Component {
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
      backgroundColor: 'yellow',
    }

    return (
      <div className={`processing-controls-${id}`} style={{...styles}}>
        output
      </div>
    )
  }
}
