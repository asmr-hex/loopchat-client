

export const TIMELINE_OPENED_IN_EDITOR = 'TIMELINE_OPENED_IN_EDITOR'

export const openTimelineInEditor = timelineId => dispatch =>
  dispatch({
    type: TIMELINE_OPENED_IN_EDITOR,
    payload: {
      timelineId,
    },
  })
