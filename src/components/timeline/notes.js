import React from 'react'
import {filter, map} from 'lodash'
/*
  given notes, timeline width/height, visible time interval, visible note interval

  filter for all notes within the visible time/note interval

  transform note times to x,y positions by
  x = (note_time - visible_start_time) * (timeline_width / visible_interval_length)

*/

const DEFAULT_TIME_PIXELS_PER_WIDTH_PIXELS = 1 / 30 // pixels/pixels
const DEFAULT_PITCH_PIXELS_PER_HEIGHT_PIXELS = 1 / 20 // pixels/pixels
const DEFAULT_PIXELS_PER_SECOND = 10 // pixels/second
const DEFAULT_PIXELS_PER_PITCH = 30 // pixels/pitch


export const renderVisibleNotes = (notes, view, timeInterval, pitchInterval) => {
  // compute the scaling factors once
  const {xScale, yScale} = computeScalingFactors(view, timeInterval, pitchInterval)

  return map(
    filter(
      notes,
      note =>
        note.start >= timeInterval.start
        && note.start <= timeInterval.end
        && note.pitch >= pitchInterval.start
        && note.pitch <= pitchInterval.end
    ),
    (note, idx) =>
      renderNote(
        time2Pixel(note, timeInterval, xScale),
        pitch2Pixel(note, pitchInterval, yScale),
        view.width * DEFAULT_TIME_PIXELS_PER_WIDTH_PIXELS,
        view.height * DEFAULT_PITCH_PIXELS_PER_HEIGHT_PIXELS,
        idx
      )
  )
}

const computeScalingFactors = (view, timeInterval, pitchInterval) => ({
  xScale: view.width / timeInterval.duration,
  yScale: view.height / pitchInterval.length,
})

const time2Pixel = (note, timeInterval, xScale) =>
      (note.start - timeInterval.start) * xScale

const pitch2Pixel = (note, pitchInterval, yScale) =>
      (note.pitch - pitchInterval.start) * yScale

const renderNote = (x, y, width, height, id) => {
  const style = {
    fill: 'red',
  }
  
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      style={style}
      key={id}
      />
  )  
}
