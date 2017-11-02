import {expect} from 'chai'
import {newTimelineUI} from '../../../../../../src/types/timeline'
import {TIMELINE_CREATED} from '../../../../../../src/redux/actions/timelines/timelines'
import {timelines} from '../../../../../../src/redux/reducers/ui/timelines/timelines'


describe('timeline ui reducer', () => {

  describe('#timelines', () => {

    it('adds a new timeline ui entry corresponding to an existing timeline on TIMELINE_CREATED', () => {
      const action = {type: TIMELINE_CREATED, payload: {timelineId: 'decline-of-western-civilization'}}
      const state = {}

      expect(timelines(state, action)).to.eql({
        [action.payload.timelineId]: newTimelineUI(),
      })
    })
  })
})
