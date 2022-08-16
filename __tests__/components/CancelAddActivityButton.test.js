import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import CancelAddActivityButton from '../../components/buttons/CancelAddActivityButton';

describe('<CancelAddActivityButton/>', () => {
  it('should render successfully', () => {
    const { container } = render(<CancelAddActivityButton />);

    expect(container).toBeTruthy();
  });
  it('should fire when pressed ', () => {
    const mockOnPress = jest.fn();
    render(<CancelAddActivityButton onPress={mockOnPress}>Cancel</CancelAddActivityButton>);
    fireEvent.press(screen.getByTestId('CancelAddActivityButton'));
    expect(mockOnPress).toHaveBeenCalled();
  });
  test('should remove opacity style after press event', () => {
    const mockOnPress = jest.fn();
    render(<CancelAddActivityButton onPress={mockOnPress}>Cancel</CancelAddActivityButton>);

    expect(screen.getByTestId('CancelAddActivityButton')).not.toHaveStyle({
      opacity: 0.7,
    });
  });
});
