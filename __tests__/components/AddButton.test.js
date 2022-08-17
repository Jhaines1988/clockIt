import React from 'react';
import AddButton from '../../components/buttons/AddButton';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react-native';
describe('<AddButton/>', () => {
  it('should render successsfully', () => {
    const { container } = render(<AddButton />);
    expect(container).toBeTruthy();
  });

  it('should fire the on press handler if a condition is met', () => {
    const onPress = jest.fn();
    const numUserActivities = 4;
    render(<AddButton onPress={onPress} numUserActivities={numUserActivities} />);

    fireEvent.press(screen.getByTestId('addButton'));
    expect(onPress).toHaveBeenCalled();
  });
  it('should not fire if the user has the maximum number of activities', () => {
    const onPress = jest.fn();
    const numUserActivities = 6;
    render(<AddButton onPress={onPress} numUserActivities={numUserActivities} />);

    fireEvent.press(screen.getByTestId('addButton'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
