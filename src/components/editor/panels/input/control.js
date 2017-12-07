import React, {Component} from 'react'
import {connect} from 'react-redux'
import {number, shape, string} from 'prop-types'
import {map} from 'lodash'
import {IconButton, IconMenu, MenuItem} from 'material-ui'
import AddIcon from 'material-ui/svg-icons/content/add'
import MidiIcon from 'material-ui/svg-icons/action/settings-input-svideo'
import AudioIcon from 'material-ui/svg-icons/image/music-note'
import CollapseIcon from 'material-ui/svg-icons/navigation/chevron-left'
import ExpandIcon from 'material-ui/svg-icons/navigation/chevron-right'
import {getTracksFromTimeline} from '../../../../redux/selectors/timelines'
import {addNewTrackToTimeline} from '../../../../redux/actions/timelines/timelines'
import {TrackInput} from './trackInput'
import styles from './index.css'
import {
  blue,
  purple,
  green,
  grey,
  lightGrey,
  midGrey,
  yellow,
  red,
} from  '../../../../styles/palette.css'


const actions = {
  addNewTrackToTimeline,
}

const mapStateToProps = (state, ownProps) => ({
  tracks: getTracksFromTimeline(state, ownProps.timelineId),
})

@connect(mapStateToProps, actions)
export class InputControlPanel extends Component {
  static propTypes = {
    timelineId: string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {collapsed: false}
  }
  
  renderTrackInputs() {
    const {tracks} = this.props

    return map(
      tracks,
      (track, idx) => (
        <TrackInput key={idx} trackId={track.id}/>
      )
    )
  }

  addTrack() {
    const {timelineId, addNewTrackToTimeline} = this.props

    addNewTrackToTimeline(timelineId)
  }

  // hacky way of updating colors.
  updateItemColors({target}, iconId, color) {
    target.style.color = color
    const svg = document.getElementById(iconId)
    svg.style.fill = color
  }

  expandCollapse() {
    this.setState({collapsed: !this.state.collapsed})
  }
  
  render() {
    const {collapsed} = this.state

    const panelStyle = {
      collapsed: {flexBasis: '0%'},
      expanded: {flexBasis: '20%'},
    }
    
    const addIcon = (
      <IconButton tooltip="add track">
        <AddIcon color={purple} hoverColor={green}/>
      </IconButton>
    )
    
    const midiIconId = 'midi-icn'
    const audioIconId = 'audio-icn'
    const midiIcon = (<MidiIcon id={midiIconId}/>)
    const audioIcon = (<AudioIcon id={audioIconId}/>)
    const menuItemStyles = {color: lightGrey}
    
    return (
      <div className={styles.inputControlPanel} style={collapsed ? panelStyle.collapsed : panelStyle.expanded }>
        <div className={styles.inputControlMenu}>
          <IconMenu
            iconButtonElement={addIcon}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            menuStyle={{backgroundColor: grey}}
            >
          <MenuItem
            onClick={() => this.addTrack()}
            primaryText="MIDI"
            leftIcon={midiIcon}
            style={menuItemStyles}
            onMouseEnter={(e) => this.updateItemColors(e, midiIconId, red)}
            onMouseLeave={(e) => this.updateItemColors(e, midiIconId, yellow)}
            />
          <MenuItem
            primaryText="Audio"
            leftIcon={audioIcon}
            style={menuItemStyles}
            onMouseEnter={(e) => this.updateItemColors(e, audioIconId, red)}
            onMouseLeave={(e) => this.updateItemColors(e, audioIconId, yellow)}
            />
          </IconMenu>
          <IconButton tooltip={collapsed ? 'expand' : 'collapse'} onClick={() => this.expandCollapse()}>
            {collapsed ? <ExpandIcon color={blue} hoverColor={green}/> : <CollapseIcon color={blue} hoverColor={green}/>}
          </IconButton>
        </div>
        <div className={styles.trackInputPanelContainer}>
          {this.renderTrackInputs()}
        </div>
      </div>
    )
  }
}

  
