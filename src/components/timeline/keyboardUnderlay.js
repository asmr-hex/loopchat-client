import React from 'react'
import {map, range} from 'lodash'
import {computeYScalingFactor, pitch2Pixel} from './transformations'
import {DEFAULT_NOTE_PIXELS_PER_HEIGHT_PIXELS} from './constants'

export const renderKeyboardUnderlay = (show, view, pitchInterval) => {
  const yScale = computeYScalingFactor(view, pitchInterval)

  return map(
    range(pitchInterval.length),
    offset => renderKeyUnderlay(
      pitch2Pixel(pitchInterval.end - offset, pitchInterval, yScale),
      view,
      isBlackKey(pitchInterval.end - offset),
      offset,
    )
  )
}

const renderKeyUnderlay = (y, view, blackKey, id) => {
  const style = {
    fill: blackKey ? '#eb8291' : '#ffc97f'
  }

  return (
    <rect
      x={0}
      y={y}
      width={view.width}
      height={view.height * DEFAULT_NOTE_PIXELS_PER_HEIGHT_PIXELS}
      style={style}
      key={id}
      />
  )
}

const isBlackKey = (keyNumber) => OCTAVE_BLACK_KEYS_MAP[keyNumber % 12]

const OCTAVE_BLACK_KEYS_MAP = {
  0: false,
  1: true,
  2: false,
  3: true,
  4: false,
  5: false,
  6: true,
  7: false,
  8: true,
  9: false,
  10: true,
  11: false,
}
