import {combineReducers} from 'redux'
import {
  WORKSPACE_UPDATED,
  PROJECT_DRAWER_TOGGLED,
} from '../../actions/workspaces'
import {HOME_WORKSPACE} from '../../../types/workspace'
import {isProjectDrawerOpen} from '../../selectors/workspaces'


export const active = (state = HOME_WORKSPACE, action) => {
  switch(action.type) {
  case WORKSPACE_UPDATED:
    return action.payload.workspace
  default:
    return state
  }
}

export const projectDrawerOpen = (state = false, action) => {
  switch(action.type) {
  case PROJECT_DRAWER_TOGGLED:
    return !state
  default:
    return state
  }
}

export const workspaces = combineReducers({
  active,
  projectDrawerOpen,
})
