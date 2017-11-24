import React, {Component} from 'react'
import styles from './header.css'
import {IconButton, IconMenu, MenuItem} from 'material-ui'
import Menu from 'material-ui/svg-icons/navigation/menu'
import Share from 'material-ui/svg-icons/social/share'
import {Logo} from '../graphics/logo'
import Peers from '../peers/peers'

export const Header = props => {
  const iconStyles = {
    width: 40,
    height: 40,
    color: '#ffffff'
  }

  return (
    <div className={styles.header}>
      <Logo width={100} height={100}/>
      <Peers/>
      <IconMenu className={styles.headerIcon}
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
