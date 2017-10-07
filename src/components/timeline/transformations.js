import React from 'react'

/**
 * scaling methods
 */
export const computeScalingFactors = (view, timeInterval, pitchInterval) => ({
  xScale: view.width / timeInterval.duration,
  yScale: computeYScalingFactor(view, pitchInterval),
})

export const computeYScalingFactor = (view, pitchInterval) =>
  view.height / pitchInterval.length

export const time2Pixel = (time, timeInterval, xScale) =>
      (time - timeInterval.start) * xScale

/**
 * pitch2Pixel converts a pitch into a pixel location within some pitchInterval.
 * note that since pitch ascends as the y-axis decreases, we compute the end.
 */
export const pitch2Pixel = (pitch, pitchInterval, yScale) =>
      (pitchInterval.end - pitch) * yScale

