import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default class TestWord extends Component {
  render = () => {
    return (
      <Select mode="tags"
              size="large"
              style={{ width: '100%', marginTop: 10 }}
              placeholder="Testar analisador"
              tokenSeparators={[',', ';', ' ']}
              onChange={this.props.onChange}>
        <Option disabled value="1">Digite palavras para testar o analisador criado a partir da gramática dada.</Option>
      </Select>
    );
  }
}
