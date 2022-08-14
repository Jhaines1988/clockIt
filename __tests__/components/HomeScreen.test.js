import React from 'react';
import renderer from 'react-test-renderer';

import HomeScreen from '../../screens/Home Screen/HomeScreen';

describe('<HomeScreen />', () => {
  it('has 2 children', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});
