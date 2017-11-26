import React, {Component} from 'react'
import {func, number} from 'prop-types'
import uuidV4 from 'uuid/v4'
import {makeLogo} from '../../graphics/logo/generator'
import {grey} from '../../../styles/palette.css'
import styles from './logo.css'


export class Logo extends Component {
  static propTypes = {
    width: number.isRequired,
    height: number.isRequired,
    containerWidth: number,
    containerHeight: number,
    onClick: func,
  }
  
  static defaultProps = {
    containerWidth: undefined,
    containerHeight: undefined,
  }

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
    const containerStyle = {
      width: this.props.containerWidth || this.props.width,
      height: this.props.containerHeight || this.props.height,
    }
    
    return (
      <div className={styles.container} style={containerStyle}>
        <canvas className={styles.logo} id={this.id} style={{backgroundColor}} width={width} height={height} onClick={() => this.props.onClick()}>
        </canvas>
        <div className={styles.txt}>wwvv</div>
      </div>
    )
  }
}
