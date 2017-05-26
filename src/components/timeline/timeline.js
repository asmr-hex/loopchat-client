import React, {Component } from 'react'
import {DropDownMenu, MenuItem} from 'material-ui'
import { map, filter } from 'lodash'
import './timeline.css'

export class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {value: 0}
  }
  handleChange = (event, index, value) => this.setState({value})

  render() {
    const {width, height, background} = this.props
    const top = (window.innerHeight - height)/2
    const left = (window.innerWidth - width)/2

    const styles = {
      width,
      height,
      top,
      left,
      background,
    }

    const inputs = [
      {name: 'No Input'},
      ...filter(this.props.inputs, input => input.type === 'input'),
    ]

    console.log(inputs)

    return (
      <div className='timeline' style={styles}>
        timeline
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          {
            map(inputs, (input, idx) => <MenuItem value={idx} key={idx} primaryText={input.name} />)
          }
        </DropDownMenu>
      </div>
    )
  }
}
