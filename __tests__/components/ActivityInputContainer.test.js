import React from 'react';
import AddButton from '../../components/buttons/AddButton';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react-native';

import ActivityInputContainer from '../../components/activityInput/ActivityInputContainer';

describe('<ActivityInputContainer/>', () => {
  it('Should render successfully', () => {
    const { container } = render(<ActivityInputContainer modalVisible={true} />);
    expect(container).toBeTruthy();
  });
});
