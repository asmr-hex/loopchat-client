import React, {Component} from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import {green, grey, lightGrey} from '../../../../styles/palette.css'


export class SearchBar extends Component {

  render() {

    return (
      <div>
        <AutoComplete
          hintText='  find'
          dataSource={[]}
          onUpdateInput={() => {}}
          hintStyle={{fontFamily: 'Share Techno Mono, monospace', color: lightGrey}}
          inputStyle={{fontFamily: 'Share Techno Mono, monospace', color: green}}
          underlineStyle={{borderColor: lightGrey}}          
          underlineFocusStyle={{borderColor: green}}
          />
      </div>
    )
  }
}

