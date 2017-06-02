var _ = require('lodash')
var jsdom = require('jsdom/lib/old-api.js').jsdom
var AudioContext = require('web-audio-engine').RenderingAudioContext
var Worker = require('webworker-threads').Worker;

global.document = new jsdom('')
global.window = document.defaultView
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property]
  }
})
global.window.AudioContext = AudioContext
global.window.Worker = Worker
global.Worker = window.Worker

class url {
  static createObjectURL(str){}
}

global.Blob = window.Blob
global.URL = url

_.assignIn(global, require('web-audio-engine').api)


console.log("okokk")
var A = new AudioContext()
console.log(A)
for (var prop in A) {
  console.log('PRINTING METHODS')
  console.log(prop)
}

// console.log(URL.createObjectURL)
// console.log(window.Blob)

// var Tone = require('tone')
// Tone.setContext(OfflineAudioContext)


//console.log(AudioNode)
// console.log(global)
