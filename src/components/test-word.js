import React, {Component} from 'react';
import {Select, Form} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const styles = {
  select: {
    width: '100%',
    marginTop: 10
  }
};

export default class TestWord extends Component {
  state = {};

  componentWillReceiveProps = props => {
    const {wrongLength} = props;
    this.setState({wrongLength});
  }

  hasErrors = () => {
    return typeof this.state.wrongLength === 'number' && this.state.wrongLength > 0;
  }

  validateStatus = () => {
    return this.hasErrors()
      ? 'error'
      : 'success';
  }

  render = () => {
    return (<Form>
      <FormItem validateStatus={this.validateStatus()}>
        <Select hasFeedback={true} mode="tags" size="large" style={styles.select} placeholder="Testar analisador" tokenSeparators={[',', ';', ' ']} onChange={this.props.onChange} onSearch={this.props.onSearch}>
          <Option disabled={true} value="-1">Digite palavras para testar o analisador criado a partir da gramática dada.</Option>
        </Select>
      </FormItem>
    </Form>);
  }
}
