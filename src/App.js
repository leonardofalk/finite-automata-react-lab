import React, { Component } from 'react';
import { Layout, Icon } from 'antd';

import SelectWord from './components/select-word';
import TestWord   from './components/test-word';
import StateTable from './components/state-table';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <h2 className="header-title">Infinity Automata v1.0 - Lexical Analyzer</h2>
          <Icon type="github" className="pull-right"/>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: '1rem', height: '100vh' }}>
            <SelectWord/>
            <TestWord/>
            <StateTable/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Infinity Automata ©2017 Created by Leonardo Falk
        </Footer>
      </Layout>
    );
  }
}

export default App;
