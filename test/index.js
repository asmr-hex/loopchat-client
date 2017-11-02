// entry point for all tests s.t. they are compiled with webpack into one test bundle
var testsContext = require.context('.', true, /.*\/.*\.spec.js$/)
testsContext.keys().forEach(testsContext)
