import { mount, shallow } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';

// enzyme MUI Test Helpers
// - https://github.com/callemall/material-ui/issues/4664

const muiTheme = getMuiTheme();

/**
* MuiMountWithContext
*
* For `mount()` full DOM rendering in enzyme.
* Provides needed context for mui to be rendered properly
* during testing.
*
* @param {obj}    node - ReactElement with mui as root or child
* @param {Object} store - optional Redux store
* @return {obj}   ReactWrapper (http://airbnb.io/enzyme/docs/api/ReactWrapper/mount.html)
*/
export const MuiMountWithContext = (node, store={}) => mount(node, {
  context: { muiTheme, store },
  childContextTypes: { muiTheme: PropTypes.object },
});

/**
* MuiShallowWithContext
*
* For `shallow()` shallow rendering in enzyme (component only as a unit).
* Provides needed context for mui to be rendered properly
* during testing.
*
* @param {obj}     node - ReactElement with mui
* @param {Object} store- optional Redux store
* @return {obj}    ShallowWrapper (http://airbnb.io/enzyme/docs/api/ShallowWrapper/shallow.html)
*/
export const MuiShallowWithContext = (node, store={}) => shallow(node, {
  context: { muiTheme, store },
  childContextTypes: { muiTheme: PropTypes.object },
});
