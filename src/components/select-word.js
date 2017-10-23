import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default class SelectWord extends Component {
  render = () => {
    return (
      <Select mode="tags"
              size="large"
              style={{ width: '100%' }}
              placeholder="Gramática"
              tokenSeparators={[',', ';', ' ']}
              onChange={this.props.onChange}>
        <Option disabled value="1">Digite as palavras que pertencem a gramática</Option>
      </Select>
    );
  }
}
