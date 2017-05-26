import React, {Component } from 'react'
import './header.css'
import {IconButton, IconMenu, MenuItem} from 'material-ui'
import Menu from 'material-ui/svg-icons/navigation/Menu'
import Share from 'material-ui/svg-icons/social/Share'
import Peers from '../peers/peers'

export const Header = props => {
  const iconStyles = {
    width: 40,
    height: 40,
    color: '#ffffff'
  }
  return (
    <div className="header">
      {/*<IconMenu className='header-icon'*/}
                {/*iconButtonElement={*/}
                  {/*<IconButton iconStyle={iconStyles}>*/}
                    {/*<Menu/>*/}
                  {/*</IconButton>*/}
                {/*}*/}
                {/*anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}*/}
                {/*targetOrigin={{horizontal: 'left', vertical: 'top'}}*/}
      {/*/>*/}
      <IconMenu className='header-icon'
                iconButtonElement={
                  <IconButton iconStyle={iconStyles}>
                    <Menu/>
                  </IconButton>
                }
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText={props.session.id}/>
      </IconMenu>
      {/*<Peers/>*/}
    </div>
  )
}
