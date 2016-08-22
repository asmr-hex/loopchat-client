import React, { Component } from 'react'
import './index.css'

export default class Countdown extends Component{
    static propTypes = {
	seconds: React.PropTypes.number.isRequired,
	radius: React.PropTypes.number.isRequired,
	timeFmt: React.PropTypes.string.isRequired,
	color: React.PropTypes.string.isRequired,
	onComplete: React.PropTypes.func,	
    }

    static defaultProps = {
	color: "#ff8787",
	timeFmt: "m:s",	
    }

    construct() {
	// do stuff?
    }

    componentDidMount() {
	this.setup()
    }

    componentWillReceiveProps(props) {
	this.setup(props)
    }

    setup(props=this.props) {
	this.ctx = this.canvas.getContext('2d')
	this.ctx.textAlign = 'center'
	this.ctx.textBaseline = 'middle'	

	this.draw()
    }

    scale() {
	// scale fontsize and everything according to radius
	const scale = 0.4
	return `${scale*this.props.radius}px`
    }

    draw() {
	const radius = this.props.radius
	const color = this.props.color
	let fontSize = this.scale()
	let font = "courier"

	this.ctx.fillStyle = color
	this.ctx.font = `bold ${fontSize} ${font}`
	this.ctx.fillText("1:23", radius, radius)

	this.drawRing(color)
	this.drawRing(color)
    }

    drawRing(color) {
	const radius = this.props.radius
	const pi = Math.PI

	this.ctx.fillStyle = color
	this.ctx.beginPath()
	this.ctx.arc(radius, radius, radius, 0, pi*2, false)
	this.ctx.arc(radius, radius, radius*0.6, pi*2, 0, true)
	this.ctx.fill()	
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
