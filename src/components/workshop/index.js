import React, {Component} from 'react'
import {connect} from 'react-redux'
import {number, string, shape} from 'prop-types'
import {getInstrument} from '../../redux/selectors/instruments'


const actions = {}

const mapStateToProps = (state, ownProps) => ({
  instrument: getInstrument(state, ownProps.instrumentId),
})

@connect(mapStateToProps, actions)
export class Workshop extends Component {
  static propTypes = {
    instrumentId: string.isRequired,
    layout: shape({
      width: number,
      height: number,
      background: string,
    }),
  }

  static defaultProps = {
    layout: {
      width: 300,
      height: 300,
      background: '#f442eb',
    }
  }

  render() {
    const {width, height, background} = this.props.layout
    const styles = {
      position: 'absolute',
      display: 'flex',
      flexFlow: 'row wrap',
      left: (window.innerWidth - width)/2,
      top: (window.innerHeight - height)/2,
      backgroundColor: background,
    }
    
    return (
      <div style={{...styles}}>
        {this.props.instrument.id}
      </div>
    )
  }
}
