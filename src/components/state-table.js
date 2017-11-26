import React, {Component} from 'react';
import {Table} from 'antd';
import _ from 'lodash';

import {ALPHABET} from '../constants';

const columnWidth = () => {
  return 900 / (ALPHABET.length + 1);
}

const COLUMNS = `*${ALPHABET}`.split('').map(letter => {
  letter = letter.toUpperCase();

  let data = {
    title: letter,
    key: letter,
    dataIndex: letter,
    width: columnWidth()
  };

  return data;
});

export default class StateTable extends Component {
  state = {
    datasource: [],
    rowSelected: '',
    columnSelected: ''
  };

  componentWillReceiveProps(props) {
    if (props.states) {
      return this.receiveStateProps(props.states);
    }

    if (props.values && props.values.length > 0) {
      let datasource = [];
      const alphabetArray = ALPHABET.split('');
      let nextFinal = false;

      _.each(props.values, (letterHash, index) => {
        let data = {
          key: datasource.length + 1,
          '*': `q${index}${nextFinal
            ? '*'
            : ''}`
        };

        _.each(alphabetArray, letter => {
          letter = letter.toUpperCase();

          if (letterHash[letter]) {
            data[letter] = letterHash[letter].state;
            nextFinal = letterHash[letter].final;
          } else {
            data[letter] = '-';
          }
        });

        datasource.push(data);
      });

      this.setState({datasource});
    }
  }

  receiveStateProps = (states) => {
    let columnSelected = states[states.length - 1],
      rowSelected = 'q0';

    if (states.length !== 1) {
      rowSelected = states[states.length - 2];
    }

    this.setState({rowSelected, columnSelected});
  }

  getRowClassName = (_, index) => {
    const currentState = `q${index}`;

    return [
      currentState, currentState === this.state.rowSelected
        ? 'active'
        : ''
    ].join(' ');
  }

  render = () => {
    return (<Table size="middle" pagination={false} bordered={true} scroll={{
        x: 900,
        y: 550
      }} style={{
        marginTop: 10
      }} columns={COLUMNS} dataSource={this.state.datasource} rowClassName={this.getRowClassName}/>)
  }
}
