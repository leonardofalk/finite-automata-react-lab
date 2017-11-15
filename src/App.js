import React, {Component} from 'react';
import {Layout, Icon, Tabs, message} from 'antd';
import _ from 'lodash';
import styles from './styles';
import TreeMap from './classes/tree-map';
import SelectWord from './components/select-word';
import TestWord from './components/test-word';
import StateTable from './components/state-table';

const {Header, Content, Footer} = Layout;
const TabPane = Tabs.TabPane;

export default class App extends Component {
  tree = new TreeMap();
  state = {
    wrongWords: [],
    tableList: []
  };

  onAddWord = (keys) => {
    this.tree.clear();
    _.each(keys, word => this.tree.push(word));
    this.tree.toArrayPerLevel();
    this.setState({tableList: this.tree.perLevelArray()})
  }

  onCheckWord = (keys) => {
    let wrongWords = [];

    _.each(keys, word => {
      if (!this.tree.valid(word)) {
        wrongWords.push(word);
      };
    });

    this.setState({wrongWords});

    if (wrongWords.length > 0) {
      message.error(`Tokens não válidos inseridos: ${wrongWords.join(', ')}`);

      _.each(document.querySelectorAll('tr.active'), tr => {
        let classes = tr.className.split(/\s+/);
        classes.push('red');

        tr.className = classes.join(' ');
      });
    } else {
      _.each(document.querySelectorAll('tr.active'), tr => {
        let classes = tr.className.split(/\s+/);
        classes.push('green');

        tr.className = classes.join(' ');
      });
    }
  }

  onTypeCheckWord = (text) => {
    this.setState({stateList: this.tree.getStateForWord(text)});
  }

  render() {
    return (<Layout className="layout">
      <Header>
        <h2 className="header-title">Infinity Automata v1.0 - Analisador Léxico</h2>
        <Icon type="github" className="pull-right"/>
      </Header>
      <Content style={styles.container}>
        <div style={styles.background}>
          <SelectWord onChange={this.onAddWord}/>
          <TestWord wrongLength={this.state.wrongWords.length} onChange={this.onCheckWord} onSearch={this.onTypeCheckWord}/>
          <Tabs defaultActiveKey="1" style={styles.tabs}>
            <TabPane tab={<span> < Icon type = "bars" /> Tabela</span>} key="1">
              <StateTable values={this.state.tableList} states={this.state.stateList}/>
            </TabPane>
            <TabPane disabled={true} tab={<span> < Icon type = "share-alt" /> Árvore</span>} key="2">
              Oops, não implementado ainda, volte mais tarde!
            </TabPane>
          </Tabs>
        </div>
      </Content>
      <Footer style={styles.footer}>
        Infinity Automata ©2017 Criado por Leonardo Falk
      </Footer>
    </Layout>);
  }
}
