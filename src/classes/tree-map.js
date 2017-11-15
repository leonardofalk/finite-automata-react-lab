import _ from 'lodash';

let treePerLevelResult = [];
let stateID = 0;

export default class TreeMap {
  constructor(level = 0) {
    this.level = level;
    this.nodes = {};
    this.last = false;
    this.state = `q${stateID++}`;
  }

  push(word) {
    if (word === '') {
      this.last = true;

      return this;
    }

    word = word.split('');
    const firstLetter = _.head(word).toUpperCase();
    const nextLetters = _.drop(word, 1);

    this.nodes[firstLetter] = (this.nodes[firstLetter] || new TreeMap(this.level + 1));
    this.nodes[firstLetter].push(nextLetters.join(''));
    this[firstLetter] = this.nodes[firstLetter];
  }

  clear() {
    for (var key in this) {
      delete this[key];
    }

    stateID = 0;

    this.level = 0;
    this.nodes = {};
    this.last = false;
    this.state = `q${stateID++}`;
  }

  empty() {
    return _.isEmpty(this.nodes);
  }

  valid(word) {
    word = word.toUpperCase();

    try {
      if (word.length === 1) {
        return this[word].last;
      } else {
        return this[word[0]].valid(word.substring(1));
      }
    } catch (error) {
      return false;
    }
  }

  getStateForWord(word) {
    word = word.toUpperCase();

    try {
      if (word.length === 1) {
        return [
          this.nodes[word[0]].state,
          // `q${parseInt(this.nodes[word[0]].state.split(/\D+/gi).join(''), 10) + 1}`
        ];
      } else if (word.length > 1) {
        const currentState = this.nodes[word[0]].state;

        return _.flatten([
          currentState,
          this.nodes[word[0]].getStateForWord(word.substring(1))
        ]);
      }
    } catch (error) {
      return '';
    }
  }

  perLevelArray() {
    return treePerLevelResult;
  }

  toArrayPerLevel(level = 0) {
    if (level === 0) {
      treePerLevelResult = [];
    }

    const tree = this;

    if (tree.level === level) {
      let tokenList = {};

      for (let key in tree.nodes) {
        tokenList[key] = {
          state: tree.nodes[key].state,
          final: tree.nodes[key].last
        };
      }

      treePerLevelResult.push(tokenList);

      if (Object.keys(tokenList).length > 0) {
        for (let key in tokenList) {
          tree.nodes[key].toArrayPerLevel(level + 1);
        }
      }
    }
  }
}
