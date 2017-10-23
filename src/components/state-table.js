import React, { Component } from 'react';
import { Table } from 'antd';

const COLUMNS = 'abcdefghijklmnopqrstuvwxyz'.split('').sort().map(letter => {
  return {
    title: letter.toUpperCase(),
    key: letter,
    dataIndex: letter
  }
});

export default class StateTable extends Component {
  render = () => {
    return (
      <Table size="middle"
             bordered={true}
             scoll={{y: 250}}
             style={{marginTop: 10}}
             columns={COLUMNS}
             dataSource={this.props.dataSource}/>
    )
  }
}
