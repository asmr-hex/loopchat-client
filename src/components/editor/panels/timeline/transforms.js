// SVG transform helper functions

import {has, keys, reduce} from 'lodash'


/**
 * factory function for composed transformation functions applied to SVG elements
 * of the given classnames/ids. When constructing a new transform, an array of transform
 * functions and an array of classnames/ids to which those transforms should be applied to
 * must be provided.
 * it is assumed that all transforms have two parameters (i.e. x, y).
 * @param {Array} transforms: functions must take an event and an element as arguments
 * and return a string representing the applied transform, e.g. 'scale(1, 1)'
 * @param {Array} selectors: classnames or ids of SVG elements. Must include '.' or '#'
 * @returns {function} the returned function takes an event and applies the curried
 * transforms to elements of the given classnames.
 */
export const newTransform = transforms => selectors => event =>
  selectors.forEach(
    s => {
      const isClass = s[0] && s[0] === '.'
      const isId = s[0] && s[0] === '#'
      
      // escape hatch if selector is empty string or doesn't specify '.' or '#'
      if (!isClass && !isId) return
      
      const elems = isClass
            ? Array.from(document.getElementsByClassName(s.substr(1)))
            : [document.getElementById(s.substr(1))]

      elems.forEach(elem => {
        if (!elem) return

        // aggregate all applied transformations into a map s.t. no transforms are duped.
        const transformMap = reduce(
          transforms,
          (acc, f) => additiveMerge(acc, f(event, elem)),
          {},
        )

        // aggregate comma delimited string of transformations, e.g. 'scale(1, 1), translate(10, 0)'
        // assumption: all transforms have exactly two values (x, y)
        const transformations = reduce(
          transformMap,
          (acc, v, name) => `${acc}${acc === '' ? '' : ', '}${name}(${v[0]}, ${v[1]})`,
          '',
        )

        // apply computed transformations
        elem.setAttribute('transform', transformations)
      })
    }
  )

/**
 * take two maps and merge them, but perform element-wise addition between the
 * values of conflicting keys in both maps. The assumptions here are (1) values
 * of keys are arrays, (2) values of keys shared between maps are of the same length.
 * @param {Object} mapA: {<string>: <Array>}
 * @param {Object} mapB: {<string>: <Array>}
 * @returns {Object} 
 */
export const additiveMerge = (mapA, mapB) =>
  reduce(
    keys(mapB),
    (acc, key) => {
      const aggregatedValue = has(acc, key)
            ? map(mapA[key], (v, i) => v + mapB[key][i])
            : mapB[key]

      return {...acc, [key]: aggregatedValue}
    },
    mapA,
  )

/**
 * factory function for a translator. Curry in the dimension of the transform (e.g. 'x' or 'y'),
 * an event pre-processor (s.t. we can accept different types of events and normalizes them into
 * a single float input value used to control the translation), and the bounds of the translation
 * (if any).
 * @param {String} dimension: 'x' or 'y'.
 * @param {function} processEvent: event pre-processor which takes an event and returns a
 * single floating point number, i.e. event -> float. Used to allow or an arbitrary event to
 * control a translation.
 * @param {Object} bounds: {min, max}, used to enforce boundary conditions.
 * @returns {function} takes an event and an element and returns a string representation of
 * the translation transform.
 */
export const translate = (dimension = 'x', processEvent = e => 0, bounds = {min: 0, max: Number.MAX_VALUE}) => {
  // generate parser only once
  const name = 'translate'
  const identityValue = 0
  const parseTransformValuesFrom = makeTransformValueParser(name)

  // translate as a closure
  const f = (event, elem) => {
    const delta = processEvent(event)
    const {min, max} = bounds
    const currentTransformStr = elem.getAttribute('transform') || ''
    const currentTranslationMap = parseTransformValuesFrom(currentTransformStr)
    const currentTranslation = currentTranslationMap[dimension]

    // only apply transform if a change has occured and the change is within bounds.
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
      const x = dimension === 'x' ? currentTranslation + deltaHat : identityValue
      const y = dimension === 'y' ? currentTranslation + deltaHat : identityValue
      
      return ({[name]: [x, y]})
    } else {
      
      // nothing to be done.
      return {[name]: [currentTranslationMap.x, currentTranslationMap.y]}
    }
  }

  return f
}

export const scale = (dimension = 'x', processEvent = e => 0, bounds = {min: 1, max: 2}) => {
  // generate parser only once
  const name = 'scale'
  const identityValue = 1
  const parseTransformValuesFrom = makeTransformValueParser(name, identityValue)

  const f = (event, elem) => {
    const delta = processEvent(event)
    const {min, max} = bounds
    const currentTransformStr = elem.getAttribute('transform') || ''
    const currentScaleMap = parseTransformValuesFrom(currentTransformStr)
    const currentScale = currentScaleMap[dimension]

    // only apply transform if a change has occured and the change is within bounds.
    if (delta !== 0  && currentScale >= min && currentScale <= max) {
      const nextScale = currentScale * (1 + delta)
      const hitMax = nextScale > max
      const hitMin = nextScale < min
      const hitBound = hitMin || hitMax

      // normalize scale to not overstep
      const normalizedScale = hitBound
            ? hitMax ? max : min
            : nextScale

      // construct new transformation string
      const x = dimension === 'x' ? normalizedScale : identityValue
      const y = dimension === 'y' ? normalizedScale : identityValue

      console.log({[name]: [x, y]})
      
      return ({[name]: [x, y]})
    } else {
      console.log('yo ', {[name]: [currentScaleMap.x, currentScaleMap.y]})

      // nothing to be done.
      return {[name]: [currentScaleMap.x, currentScaleMap.y]}
    }
  }

  return f
}

/**
 * factory function for a parser of transform strings. Returns a closure s.t. we
 * only have to build the regexp once rather than each times we want to parse a
 * string.
 * @param {String} transformName: the name of the transform function, e.g. 'scale'
 * @returns {function} a closure using a pre-compiled regexp. Takes a transform
 * string as only argument, e.g. `scale(2, 4), translate(0,0)`, and returns an
 * object {x, y} with the values of the transformName provided to the factory
 * function, e.g. {x: 2, y: 4} for 'scale'.
 */
export const makeTransformValueParser = (transformName, defaultValue = 0) => {
  // build regex only once
  const valueMatch = '\\s*(-?[\\d.]*)\\s*'
  const r = new RegExp(`${transformName}\\(${valueMatch}[,]${valueMatch}`)

  // implement parser in closure
  const g = transformString => {
    const matches = transformString.match(r) || []

    return matches.length === 3
      ? {x: parseFloat(matches[1]), y: parseFloat(matches[2])}
      : {x: defaultValue, y: defaultValue}
  }

  // return closure
  return g
}
