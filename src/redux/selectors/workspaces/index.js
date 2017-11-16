import {get} from 'lodash'
import {HOME_WORKSPACE} from '../../../types/workspace'


export const getActiveWorkspace = state =>
  get(state, `workspaces.active`, HOME_WORKSPACE)
