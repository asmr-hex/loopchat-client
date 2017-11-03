import React from 'react'
import {expect} from 'chai'
// import {MuiShallowWithContext} from '../../../../support/enzymeUtils'
// import {mockStore} from '../../../../support/setup'
import {shallowWithStore} from 'enzyme-redux'
import {createMockStore} from 'redux-test-utils'
import {getDefaultState} from '../../../../support/state'
import {DropDownMenu} from 'material-ui'
import {TrackInput} from '../../../../../src/components/editor/panels/input/trackInput'
import {NULL_DEVICE} from '../../../../../src/types/midiDevice'


describe.only('<TrackInput />', () => {

  const sampleTrackId = 'gloom-n-doom'
  const sampleLayout = {
    x: 0,
    y: 0,
    width: 100,
    height: 300,
  }
  const store = createMockStore(getDefaultState())
  const component = shallowWithStore(
    <TrackInput trackId={sampleTrackId} layout={sampleLayout}cc/>,
    store
  ).dive() // NOTE (cw|11.2.2017) its still unclear why we need this dive() here...
  
  
  it('has the NULL_DEVICE as the default selectedDeviceId in initial state', () => {
    expect(component.state().selectedDeviceId).to.eql(NULL_DEVICE)
  })
  
  it('renders a material-ui <DropDownMenu />', () => {
    expect(component.find(DropDownMenu)).to.have.length(1)
  })
})


