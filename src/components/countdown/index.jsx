import React, { Component } from 'react'
import './index.css'

export default class Countdown extends Component{
    constructor() {
	super()
	this.state = {
	    active: false
	}

	this.elapsedSeconds = 0

	this.handleClick = this.handleClick.bind(this)
    }

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

    handleClick() {
	this.setState({active: !this.state.active})
	if (this.state.active) {
	    // start ticker
	    this.elapsedSeconds = 0
	    this.tick()
	}
    }

    tick() {
	/*
	if (!this.state.active) {
	    return
	}*/

	console.log("OK")

	let start = Date.now()
	setTimeout(() => {
	    let duration = (Date.now() - start) / 1000
	    this.elapsedSeconds += duration

	    if (this.elapsedSeconds > this.props.seconds) {
		this.elapsedSeconds = 0
		this.tick()
	    } else {
		this.draw()
		this.tick()
	    }
	}, 100)
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
	let p = this.elapsedSeconds/this.props.seconds

	this.ctx.clearRect(0, 0, radius*2, radius*2)

	this.ctx.fillStyle = color
	this.ctx.font = `bold ${fontSize} ${font}`
	this.ctx.fillText(`${Math.round(this.elapsedSeconds)}`, radius, radius)

	this.drawRing(this.shader(color, 0.6), 1)
	this.drawRing(color, (1-p))
    }

    shader(color, percent) {
	let f = parseInt(color.slice(1), 16)
	let t = percent < 0 ? 0:255
	let p = percent < 0 ? percent*-1:percent
	let R = f >> 16
	let G = f >> 8&0x00FF
	let B = f >> f&0x0000FF

	R = 0x1000000 + (Math.round((t-R)*p)+R)*0x10000
	G = (Math.round((t-G)*p)+G)*0x100
	B = (Math.round((t-B)*p)+B)
	
	return "#" + (R+B+G).toString(16).slice(1)
    }

    drawRing(color, p) {
	const radius = this.props.radius
	const pi = Math.PI

	this.ctx.fillStyle = color
	this.ctx.beginPath()
	this.ctx.arc(radius, radius, radius, 1.5*pi - (2*pi*p), pi*1.5, true)
	this.ctx.arc(radius, radius, radius*0.6, pi*1.5, 1.5*pi - (2*pi*p), false)
	this.ctx.fill()	
    }

    render() {
	let {radius} = this.props
	return (
	    <canvas className="countdown"
		    onClick={this.handleClick}
		    ref={(c) => {this.canvas = c}}
		    width={radius*2}
		    height={radius*2}
	    >
	    </canvas>
	)
    }
}
