// SVG transform helper functions

import {get, has, keys, map, merge, reduce} from 'lodash'


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
 *
 * TODO (cw|12.5.2017) allow for post-transform callbacks s.t. we can do things like
 * re-draw an svg canvas if we reach a certain scale or something.
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

        // get initial transform string from attributes
        const initialTransformStr = elem.getAttribute('transform') || ''        
        
        // aggregate all applied transformations into a map s.t. no transforms are duped.
        const transformMap = reduce(
          transforms,
          (acc, f) => f(event, acc),
          parseTransform(initialTransformStr),
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

// TODO (cw|12.5.2017) we want to be able to merge the transforms of pre-existing svg elements
// into newly created ones. For example, if we have a pre-existing timeline and we have already
// scrolled and re-scaled, then we want any newly added tracks to be added with the same translation
// and scaling.
// export const mergeTransforms = (from, to) => {}

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
 * @param {Object} event: an event we want to control a transformation.
 * @param {Object} transformMap: a map of transforms. e.g. {scale: [1, 1], translate: [0, 0]}.
 * @returns {function} takes an event and an element and returns a string representation of
 * the translation transform.
 */
export const translate = (dimension = 'x', processEvent = e => 0, bounds = {min: 0, max: Number.MAX_VALUE}) =>
  (event, transformMap) => {
    // generate parser only once
    const name = 'translate'
    const identity = 0
    const computeNextScale = (z, dz) => z + dz
    const update = updateTransform(name, bounds, dimension, identity, computeNextScale)
    
    return update(processEvent(event), transformMap)
}

/**
 * factory for creating an svg scaler.
 * @param {String} dimension: 'x'|'y'
 * @param {function} processEvent: (event) => <float>. pre-process event.
 * @param {Object} bounds: {min, max}
 * @param {Object} event: an event we want to control a transformation.
 * @param {Object} transformMap: a map of transforms. e.g. {scale: [1, 1], translate: [0, 0]}.
 * @returns {Object} a transformMap
 */
export const scale = (dimension = 'x', processEvent = e => 0, bounds = {min: 1, max: 2}) =>
  (event, transformMap) => {
    const name = 'scale'
    const identity = 1
    const computeNextScale = (z, dz) => z * (1 + dz)
    const update = updateTransform(name, bounds, dimension, identity, computeNextScale)

    return update(processEvent(event), transformMap)
}

/**
 * factory for generating update functions for different transforms. The generated function
 * performs bounds checking on transformed values. Returns an updated map of transforms.
 * @param {String} name: name of transform we are updating. e.g. 'scale'
 * @param {Object} bounds: {min, max}
 * @param {String} dim: dimension we are updating. 'x'|'y'
 * @param {Number} I: identity value of the transform. e.g. I = 0 for translate.
 * @param {function} computeNextTransform: (z, dz) => <float>. computes the next.
 * @returns {Object} transform Map
 */
export const updateTransform = (name, bounds, dim = 'x', I = 0, computeNextTransform = (z, dz) => z + dz) =>
  (dz, T) => {
    const {min, max} = bounds
    const Z = get(T, `${name}`, [I, I])
    const z = Z[dim === 'x' ? 0 : 1]
    const zhat = Z[dim === 'x' ? 1 : 0]

    // check if there is even someting to do.
    if (dz !== 0  && z >= min && z <= max) {
      const next = computeNextTransform(z, dz)
      const hitMax = next > max
      const hitMin = next < min
      const hitBound = hitMin || hitMax
      
      // if bounds have been reached, just set the transform to the bound
      if (hitBound) {
        const norm = hitMax ? max : min
        return {...T, [name]: dim === 'x' ? [norm, zhat] : [zhat, norm]}
      }
      
      // update transform in appropriate dimension
      return {...T, [name]: dim === 'x' ? [next, zhat] : [zhat, next]}
    }
    
    // there was nothing to be done.
    return T
}

/**
 * parses an SVG transform string into a map keyed by transform names with
 * array values corresponding to the transform parameters, e.g. `scale(1.3, 1)`
 * is parsed into {scale: [1.3, 1]}.
 * @param {String} transformString
 * @returns {Object} keyed by transform name with parameter arrays as values.
 */
export const parseTransform = transformString => {
  const transformRegExp = /(\w+\(\s*(\-?\d+\.?\d*e?\-?\d*\s*,*?\s*)+\))+/g
  const transformTokenRegExp = /[\w\.\-]+/g

  return reduce(
    transformString.match(transformRegExp),
    (acc, transform) => {
      const tokens = transform.match(transformTokenRegExp)
      
      return {...acc, [tokens.shift()]: map(tokens, v => parseFloat(v))}
    },
    {},
  )
}
