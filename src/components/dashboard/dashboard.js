import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/svg-icons/navigation/Menu'
import Share from 'material-ui/svg-icons/social/Share'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Peers from '../../containers/peers'
import './dashboard.css'

// we need this for this component to work with AppBar
injectTapEventPlugin()

const Dashboard = (props) => {
  const iconStyles = {
    width: 40,
    height: 40,
    color: '#ff9694'
  }
  return(
      <div className='dashboard'>
      <IconMenu className='dashboard-icon'
          iconButtonElement={
            <IconButton iconStyle={iconStyles}>
              <Menu/>
            </IconButton>
          }
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
      />
        <IconMenu className='dashboard-icon'
          iconButtonElement={
            <IconButton iconStyle={iconStyles}>
              <Share/>
            </IconButton>
          }
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
      <MenuItem primaryText={props.session.id}/>
        </IconMenu>
    <Peers/>
    </div>
  )
}

export default Dashboard
