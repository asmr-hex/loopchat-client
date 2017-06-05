// // NOTE (cw|6.4.2017) this was an attempt to stub all the browser dependencies
// // of the ToneJS library (which makes extensive use of the WebAudio API). Unfortuantely,
// // it grew much to difficult to try to stub everything, so I've decided to try running
// // *all* tests (including unit tests) in the browser using Karma.
//
// var _ = require('lodash')
// var jsdom = require('jsdom/lib/old-api.js').jsdom
// var AudioContext = require('web-audio-engine').RenderingAudioContext
// var Worker = require('webworker-threads').Worker;
//
// global.document = new jsdom('')
// global.window = document.defaultView
// Object.keys(document.defaultView).forEach(property => {
//   if (typeof global[property] === 'undefined') {
//     global[property] = document.defaultView[property]
//   }
// })
// global.window.Worker = Worker
// global.Worker = window.Worker
//
// class url {
//   static createObjectURL(str){}
// }
//
// global.Blob = window.Blob
// global.URL = url
//
// //require('./audioContextMock')
// global.window.AudioContext = AudioContext
// _.assignIn(global, require('web-audio-engine').api)
