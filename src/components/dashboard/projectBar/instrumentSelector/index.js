import React, {Component} from 'react'
import {connect} from 'react-redux'
import {map, truncate} from 'lodash'
import {buildNewInstrument} from '../../../../redux/actions/instruments'
import {openInstrumentInWorkshop} from '../../../../redux/actions/ui/instruments'
import {getInstruments} from '../../../../redux/selectors/instruments'


const actions = {
  buildNewInstrument,
  openInstrumentInWorkshop,
}

const mapStateToProps = (state, ownProps) => ({
  instruments: getInstruments(state),
})

@connect(mapStateToProps, actions)
export class InstrumentSelector extends Component {

  renderInstrumentLinks() {
    return map(
      this.props.instruments,
      (instrument, idx) => (
        <span key={idx}>
          <br/>
          |- 
          <span onClick={() => this.props.openInstrumentInWorkshop(instrument.id)}>{truncate(instrument.id, {length: 20})}</span>
        </span>
      )
    )
  }
  
  render() {
    const {
      buildNewInstrument,
      instruments,
    } = this.props
    
    return (
      <div>
        instruments
        <button onClick={() => buildNewInstrument()}>
          {'+'}
        </button>
        {this.renderInstrumentLinks()}
      </div>
    )
  }
}
