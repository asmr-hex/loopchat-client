import {combineReducers} from 'redux'
import {WORKSPACE_UPDATED} from '../../actions/workspaces'
import {HOME_WORKSPACE} from '../../../types/workspace'


export const active = (state = HOME_WORKSPACE, action) => {
  switch(action.type) {
  case WORKSPACE_UPDATED:
    return action.payload.workspace
  default:
    return state
  }
}

export const workspaces = combineReducers({
  active,
})
