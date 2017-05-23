import { pick } from 'lodash'
import { MIDI_MSG_RECEIVED } from './bus'
export const DEVICE_STATE_CONNECTED = 'connected'
export const DEVICE_STATE_DISCONNECTED = 'disconnected'

export const connectMidiDeviceWith = (register, midiBus) => device => {
  // register connected device using curried register function
  register(pick(device, ['id', 'name', 'manufacturer', 'type', 'state']))

  // forward onmidimessage events to midi bus
  device.onmidimessage = forwardEventsTo(midiBus)

  console.info(
    `%cConnected --> %c${device.name}`,
    'color:green; font-weight:bold',
    'color:purple; font-weight:bold',
  )
}

const forwardEventsTo = midiBus => msg => {
  const event = {
    type: MIDI_MSG_RECEIVED,
    payload: msg,
  }

  midiBus.dispatchEvent(event)
}

export const disconnectMidiDeviceWith = unregister => device => {
  // unregister disconnected device using curried unregister function
  unregister(device)

  console.info(
    `%cDisconnected -/-> %c${device.name}`,
    'color:red; font-weight:bold',
    'color:purple; font-weight:bold',
  )
}
