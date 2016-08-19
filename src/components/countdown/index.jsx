import React, { Component } from 'react'
import './index.css'

export default class Countdown extends Component{
    construct() {
	// do stuff?
    }

    componentDidMount() {
	this.seconds = this.props.seconds
	this.radius = this.props.radius
	this.color = this.props.color
	this.setup()
    }

    componentWillReceiveProps(props) {
	this.seconds = props.seconds
	this.radius = props.radius
	this.color = props.color
	this.setup()
    }

    setup() {
	this.draw()
    }

    draw() {
	const ctx = this.canvas.getContext('2d')

	ctx.textAlign = 'center'
	ctx.textBase = 'middle'	

	ctx.beginPath()
	ctx.globalAlpha = 1
	ctx.fillStyle = this.color
	ctx.arc(this.radius, this.radius, this.radius, Math.PI*1.5, 0, false)
	ctx.arc(this.radius, this.radius*0.6, this.radius, 0, Math.PI*1.5, false)
	ctx.fill()
    }

    render() {
	let {radius} = this.props
	return (
	    <canvas className="countdown"
		    ref={(c) => {this.canvas = c}}
		    width={radius*2}
		    height={radius*2}
	    >
	    </canvas>
	)
    }
}

Countdown.propTypes = {
    seconds: React.PropTypes.number.isRequired,
    radius: React.PropTypes.number.isRequired,
    color: React.PropTypes.string,
    onComplete: React.PropTypes.func,
    showMilliseconds: React.PropTypes.bool,
}

Countdown.defaultProps = {
    color: "#ff8787",
    showMilliseconds: false
}
