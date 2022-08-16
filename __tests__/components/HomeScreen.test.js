import React from 'react';
import renderer from 'react-test-renderer';

import HomeScreen from '../../screens/Home Screen/HomeScreen';
import { render, screen, fireEvent } from '@testing-library/react-native';

describe('<HomeScreen />', () => {
  test('has 2 children', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});
