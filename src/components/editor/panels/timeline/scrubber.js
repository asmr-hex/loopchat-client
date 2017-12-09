import React, {Component} from 'react'
import {connect} from 'react-redux'
import {debounce} from 'lodash'
import {object, number, bool, string} from 'prop-types'
import {drag} from 'd3-drag'
import {transition} from 'd3-transition'
import {select, selectAll, event as currentEvent} from 'd3-selection'
import {getTimelineProperty} from '../../../../redux/selectors/timelines'
import {
  DEFAULT_TIMELINE_LENGTH,
  DEFAULT_UNIT_LENGTH_PER_SECOND,
  DEFAULT_UNIT_HEIGHT_PER_KBD_NOTE,
  DEFAULT_N_SECONDS,
  MIDI_NOTE_MAX,
} from '../timeline/constants'
import {timeAxisHeight} from '../../panels/input/index.css'
import {blue} from '../../../../styles/palette.css'
import {SVGGlow} from '../../../svg/glow'
import {newTransform, translate} from  './transforms'


const actions = {}

const mapStateToProps = (state, ownProps) => ({
  time: getTimelineProperty(state, ownProps.timelineId, 'scrubberTime'),
  playing: getTimelineProperty(state, ownProps.timelineId, 'playing'),
})

@connect(mapStateToProps, actions)
export class Scrubber extends Component {
  static propTypes = {
    timelineId: string.isRequired,
    type: string,
  }

  static defaultProps = {
    type: 'line', // || 'circle'
    style: {
      stroke: blue,
      fill: blue,
    },
  }

  constructor(props) {
    super(props)

    this.state = {playing: this.props.playing}

    this.onDrag = debounce(
      newTransform([
        translate('x', ({dx}) => dx, {min: 0, max: 30000}),
      ])(['.scrubber']),
      0, // for now don't debounce... since it causes the scrubber to eventually lag behind mouse
      // {leading: true, trailing: false},
    )
  }

  componentDidMount() {
    this.registerDragHandler(this.onDrag)
  }
  
  componentDidUpdate() {
    this.registerDragHandler(this.onDrag)
    
    // if no state change has occurred, do nothing
    if (this.state.playing === this.props.playing) return

    this.setState({playing: this.props.playing})
    
    // if (this.props.playing) this.animatePlayback()

    // if (!this.props.playing) this.stopPlayback()
  }

  registerDragHandler(transform) {
    const glub = debounce(() => console.log('OK'), 250) // TODO (cw|12.8.2017) use this to debounce dispatching update scrubber time to redux store.
    selectAll('.scrubber').each(function() {
      const element = select(this)

      const f = scrubber => drag().on('drag', () => {
        transform(currentEvent)
        glub()
      })
      
      element.call(f(element))
    })
  }
  
  render() {
    const {time, style, type} = this.props
    const glowFilter = 'scrubber-glow-filter'
    
    const line = (
      <line
        className={'scrubber'}
        x1={time * DEFAULT_UNIT_LENGTH_PER_SECOND}
        y1={0}
        x2={time * DEFAULT_UNIT_LENGTH_PER_SECOND}
        y2={DEFAULT_UNIT_HEIGHT_PER_KBD_NOTE * MIDI_NOTE_MAX}
        style={{...style, filter: `url(#${glowFilter})`}}
        />
    )

    const radius = 0.15 * parseFloat(timeAxisHeight)
    const circle = (
      <circle
        className={'scrubber'}
        cx={time * DEFAULT_UNIT_LENGTH_PER_SECOND}
        cy={parseFloat(timeAxisHeight) - radius}
        r={radius}
        style={{...style, filter: `url(#${glowFilter})`}}
        />
    )
    
    return (
      <g>
        <SVGGlow id={glowFilter}/>
        { type === 'circle' ? circle : line }
      </g>
    )
  }
}

export const stopScrubber = () => {
  selectAll('.scrubber')
    .interrupt()
    .transition()
}

export const startScrubber = () => {
  // const transformMap = parseTransform(
  //   document
  //     .getElementsByClassName('time-axis')[0]
  //     .getAttribute('transform') || ''
  // )
  // const scaleX = transformMap.scale[0]
  // const translationX = transformMap.translate[0]
  // const timeScaled = time * scaleX + translationX

  selectAll('.scrubber')
    .transition()
    .attr('transform', `translate(${DEFAULT_TIMELINE_LENGTH}, 0)`)
    .duration(DEFAULT_N_SECONDS * 1000)
    .ease(t => t)
}

// export const getScrubberTranslation = () => {
//   const transformMap = parseTransform(
//     document
//       .getElementsByClassName('scrubber')[0]
//       .getAttribute('transform') || ''
//   )
//   const translationX = transformMap.translate[0]  
// }
