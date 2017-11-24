import {fill, map, range, reduce} from 'lodash'


// generate signal shape

export const makeLogo = (ctx) => {
  const width = ctx.canvas.clientWidth
  const height = ctx.canvas.clientHeight
  // const x = range(0, width)
  // const y = fill(Array(x.length), 50) //makeSineWave(x, 100, 50)

  const {x, y} = makeSineWave(width, 2, 40, 50)

  ctx.moveTo(x[0], y[0])
  
  for (let i = 0; i < x.length-1; i++) {
    ctx.lineTo(x[i+1], y[i+1])
  }
  ctx.lineWidth = 3
  ctx.stroke()
}

export const addWaves = ys => {
  if (ys.length == 1) return ys
  
  const aggregation = map(
    ys[0],
    (yi, idx) => yi + ys[1][idx],
  )

  const newYs = [aggregation, ...ys.slice(1, ys.length)]

  return addWaves(newYs)
}

export const makeSineWave = (width, period = 1, amplitude = 1, offset = 0) => {
  const dx = width / 100
  const x = range(0, width, dx)
  const radians = range(0, period, period / x.length)
  const y = map(radians, r => amplitude * Math.sin(r * Math.PI) + offset)
  
  return {x, y}
}

export const makeCosineWave = (period = 1, amplitude = 1, offset = 0) =>
  map(
    range(period, 0.1),
    i => amplitude * Math.cos(i * Math.PI) + offset,
  )
