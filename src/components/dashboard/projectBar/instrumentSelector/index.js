import React, {Component} from 'react'
import {connect} from 'react-redux'
import {buildNewInstrument} from '../../../../redux/actions/instruments'


const actions = {
  buildNewInstrument,
}

const mapStateToProps = (state, ownProps) => ({})

@connect(mapStateToProps, actions)
export class InstrumentSelector extends Component {

  render() {
    const {buildNewInstrument} = this.props
    
    return (
      <div>
        instruments
        <button onClick={() => buildNewInstrument()}>
          {'+'}
        </button>
      </div>
    )
  }
}
