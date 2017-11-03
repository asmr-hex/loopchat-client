import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'


// setup enzyme for React component tests
Enzyme.configure({adapter: new Adapter()})

// entry point for all tests s.t. they are compiled with webpack into one test bundle
var testsContext = require.context('.', true, /.*\/.*\.spec.js$/)
testsContext.keys().forEach(testsContext)
