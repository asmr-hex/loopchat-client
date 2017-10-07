import React from 'react'
import {computeXScalingFactor} from './transformations'
import {ceil, map, range} from 'lodash'

export const renderTimeGridUnderlay = (show, view, timeInterval) => {
  // if we aren't showing the grid, lets return an empty array immediately
  if (!show) return []

  const xScale = computeXScalingFactor(view, timeInterval)

  return map(
    range(ceil(timeInterval.duration)),
    offset => renderGridLine(
      ceil(timeInterval.start + offset) * xScale,
      view.height,
      offset
    )
  )
}

const renderGridLine = (x, height, id) => {
  return (
    <line
      x1={x}
      x2={x}
      y1={0}
      y2={height}
      stroke={'black'}
      key={id}
      />
  )
}
