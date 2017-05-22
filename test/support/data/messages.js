import moment from  'moment'
import { times } from 'lodash'

const defaultMessage = {
  timestamp: moment().format(),
  from: 'sad wraith',
  text: 'my soul is not at peace.',
}

export const getSampleMessages = n =>
  times(n, t => ({
    ...defaultMessage,
    timestamp: moment(defaultMessage.timestamp).add(t, 'second').format()
  }))
