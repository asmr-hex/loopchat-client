import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {black, white} from './palette.css'


// TODO (cw|11.25.2017) put all common styles in here...
export const wwvvMuiTheme = getMuiTheme({
  fontFamily: 'Share Techno Mono, monospace',
  palette: {canvasColor: '#00000000'},
  tooltip: {rippleBackgroundColor: black, color: white},
})

