import React, {Component} from 'react'
import uuidV4 from 'uuid/v4'
import {makeLogo} from '../../graphics/logo/generator'
import {grey} from '../../../styles/palette.css'


export class Logo extends Component {
  constructor(props) {
    super(props)

    this.id = uuidV4()
  }

  componentDidMount() {
    this.drawLogo()
  }
  
  drawLogo() {
    const canvas = document.getElementById(this.id)
    const ctx = canvas.getContext('2d')
    
    makeLogo(ctx)
  }

  render() {
    const {width, height} = this.props
    const backgroundColor = grey
    
    return (
      <canvas id={this.id} style={{backgroundColor}} width={width} height={height}>
      </canvas>
    )
  }
}
