import React, {Component} from 'react';
import {Select} from 'antd';

const Option = Select.Option;
const styles = {
  select: {
    width: '100%'
  }
};

class SelectWord extends Component {
  render = () => {
    return (<Select tokenSeparators={[',', ';', ' ']} mode="tags" size="large" style={styles.select} placeholder="Gramática" onChange={this.props.onChange}>
      <Option disabled={true} value="1">Digite as palavras que pertencem a gramática</Option>
    </Select>);
  }
}

export default SelectWord;
