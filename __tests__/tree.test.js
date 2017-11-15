import TreeMap from '../src/classes/tree-map'

describe('TreeMap', () => {
  it('expects not to be empty', () => {
    const tree = new TreeMap();
    tree.push('abc');
    expect(tree.empty()).not.toBe(true);
  });

  it('expects last letter to be the last', () => {
    const tree = new TreeMap();
    tree.push('abc');
    expect(tree.A.B.C.last).toBe(true);
  });

  it('expects last letter to be the last after a new word path', () => {
    const tree = new TreeMap();
    tree.push('abc');
    tree.push('abcd');
    expect(tree.A.last).not.toBe(true);
    expect(tree.A.B.last).not.toBe(true);
    expect(tree.A.B.C.last).toBe(true);
    expect(tree.A.B.C.D.last).toBe(true);
  });

  it('expects to validate words correctly', () => {
    const tree = new TreeMap();
    tree.push('abc');
    tree.push('abcd');
    expect(tree.valid('abcdd')).not.toBe(true);
    expect(tree.valid('aaa')).not.toBe(true);

    expect(tree.valid('abc')).toBe(true);
    expect(tree.valid('abcd')).toBe(true);
  });
})
