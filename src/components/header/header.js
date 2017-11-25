import React, {Component} from 'react'
import {connect} from 'react-redux'
import styles from './header.css'
import {IconButton, IconMenu, MenuItem} from 'material-ui'
import Menu from 'material-ui/svg-icons/navigation/menu'
import Share from 'material-ui/svg-icons/social/share'
import {lightGrey} from '../../styles/palette.css'
import {Logo} from '../graphics/logo'
import Peers from '../peers/peers'
import {toggleProjectDrawer} from '../../redux/actions/workspaces'


const actions = {
  toggleProjectDrawer,
}
const mapStateToProps = (state, ownProps) => ({})

@connect(mapStateToProps, actions)
export class Header extends Component {
  render() {
    const iconStyles = {
      width: 48,
      height: 48,
      color: lightGrey,
    }

    return (
      <div className={styles.header}>
        <Logo width={64} height={48} containerWidth={100} onClick={this.props.toggleProjectDrawer}/>
        <Peers/>
        <IconMenu className={styles.headerIcon}
                  style={{width: 100, display: 'flex', justifyContent: 'center'}}
                  iconButtonElement={
                      <IconButton iconStyle={iconStyles} style={{padding: 0}}>
                          <Menu/>
                        </IconButton>
                      }
                      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      >
          <MenuItem primaryText={this.props.session.id}/>
        </IconMenu>
      </div>
    )
  }
}

