import React, {Component} from 'react';
import {
  Text
} from 'native-base';
// import Numeral form "numeral";
var Numeral = require('numeral');

export default  class NumberFormatComponent extends Component {

  render() {
    let props = this.props;
    const {format, children, style, numberOfLines, ellipsizeMode} = props;
    if (!format) return (< Text style={style}>  {children}  </Text>);
    var output;
    if (typeof children == "object" && children[0]) {
      output = [].concat(children);
      output[0] = Numeral(output[0]).format(format);
    } else if (typeof children !== "object") {
      output = Numeral(children).format(format);
    }else{
      output = children;
    }
    return (< Text  style={style} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{output}</Text>);
  }
}
