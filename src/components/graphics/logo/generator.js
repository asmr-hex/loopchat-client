import {fill, map, range, reduce} from 'lodash'
import {blue, purple} from '../../../styles/palette.css'


// generate signal shape
//
// TODO (cw|11.25.2017) these functions are not very well organized w.r.t.
// parameters being in radians and amplitudes being normalized. It would be
// to refactor s.t. it is more intuitive to use these functions.

export const makeLogo = (ctx) => {
  const width = ctx.canvas.clientWidth
  const height = ctx.canvas.clientHeight
  const x = range(0, width, width / 100)
  const maxAmplitude = height / 2.2

  const signalDrawer = drawSignal(ctx, width, height, maxAmplitude)
  const s1 = signal([sine(1, 2.08)])
  const s2 = signal([cosine(1, 2.88, 0.43), cosine(1, 3.88, 0.43)])
  
  signalDrawer(x, s1, c => {c.lineWidth = 2; c.strokeStyle = blue})
  signalDrawer(x, s2, c => {c.strokeStyle = purple})
}

export const drawSignal = (ctx, width, height, maxAmp) => (xs, waveform, callback = ctx => {}) => {
  const offset = height / 2

  ctx.moveTo(xs[0], waveform(xs[0] / width))
  ctx.beginPath()
  
  for (let i = 0; i < xs.length-1; i++) {
    const xi = xs[i+1]
    const r = xi / width
    const y = waveform(r) * maxAmp + offset

    ctx.lineTo(xi, y)
  }

  callback(ctx)

  ctx.stroke()
}

export const signal = waves => x =>
  reduce(waves, (y, wave) => (y + wave(x)) / waves.length, 0)

export const sine = (amplitude = 1, period = 2, phase = 0) => x =>
  amplitude * Math.sin((x * period + phase) * Math.PI)

export const cosine = (amplitude = 1, period = 2, phase = 0) => x =>
  amplitude * Math.cos((x * period + phase) * Math.PI)
