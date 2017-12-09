import React, {Component} from 'react'


export const SVGGlow = ({id, std=2.5}) => (
  <defs>
    <filter id={id} height='600' width='600' filterUnits='userSpaceOnUse'>
      <feGaussianBlur stdDeviation={std} result='colorBlur'/>
      <feMerge>
        <feMergeNode in='colorBlur'/>
        <feMergeNode in='SourceGraphic'/>
      </feMerge>
    </filter>
  </defs>
)
