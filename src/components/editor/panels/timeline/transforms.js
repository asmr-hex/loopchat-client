
export const newTransform = (transforms, classNames) => event =>
  classNames.forEach(
    c => {
      const elems = Array.from(document.getElementsByClassName(c))

      elems.forEach(elem => {
        const transformation = reduce(
          transforms,
          (acc, f, idx) => `${acc}${f(event, elem)}${idx + 1 === transforms.length ? '' : ', '}`,
          '',
        )

        // apply computed transformations
        elem.setAttribute('transform', transformations)
      })
    }
  )

export const translate = (dimension = 'x', processEvent = e => e, bounds = {min: 0, max: 666}) => {
  // generate parser only once
  const name = 'translate'
  const parseTransformValuesFrom = makeTransformValueParser(name)

  // translate as a closure
  const f = (event, elem) => {
    const delta = processEvent(event)
    const {min, max} = bounds
    const currentTranslationStr = elem.getAttribute('transform')
    const currentTranslation = parseTransformValuesFrom(currentTranslationStr)[dimension]

    if (delta !== 0 && currentTranslation >= min && currentTranslation <= max) {
      const nextTranslation = currentTranslation + delta
      const hitMax = nextTranslation > max
      const hitMin = nextTranslation < min
      const hitBound = hitMin || hitMax

      // normalize delta to not overstep
      const deltaHat = hitBound
            ? hitMax ? delta - nextTranslation : delta + (min - nextTranslation)
            : delta

      // construct new transformation string
      const x = dimension === 'x' ? currentTranslation + deltaHat : 0
      const y = dimension === 'y' ? currentTranslation + deltaHat : 0
      
      return `${name}(${x}, ${y})`
    } else {
      
      // nothing to be done.
      return currentTransformationStr
    }
  }

  return f
}

export const makeTransformValueParser = transformName => {
  // build regex only once
  const valueMatch = '\s*(-?[\d.]*)\s*'
  const r = new RegExp(`/${transformName}\(${valueRegex}[,]${valueRegex}/`)

  // implement parser in closure
  const g = transformString => {
    const matches = transformString.match()

    return matches.length === 3
      ? {x: matches[1], y: matches[2]}
      : {x: 0, y: 0}
  }

  // return closure
  return g
}
