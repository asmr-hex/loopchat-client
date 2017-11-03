import React from 'react'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {MuiMountWithContext} from '../../../../support/enzymeUtils'
import {mockStore} from '../../../../support/setup'
import {getDefaultState} from '../../../../support/state'
import {DropDownMenu} from 'material-ui'
import {TrackInput} from '../../../../../src/components/editor/panels/input/trackInput'


describe('<TrackInput />', () => {

  const sampleTrackId = 'gloom-n-doom'
  const sampleLayout = {
    x: 0,
    y: 0,
    width: 100,
    height: 300,
  }
  const store = mockStore(getDefaultState())
  
  it('renders a material-ui <DropDownMenu />', () => {
    const wrapper = MuiMountWithContext(
      <TrackInput trackId={sampleTrackId} layout={sampleLayout}/>,
      store,
    )

    expect(wrapper.find(DropDownMenu)).to.have.length(1)
  })
})


