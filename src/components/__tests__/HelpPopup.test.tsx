// src/components/__tests__/HelpPopup.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HelpPopup from '../HelpPopup';

describe('HelpPopup Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    // Reset the mock before each test
    mockOnClose.mockClear();
  });

  it('renders correctly and shows the title', () => {
    render(<HelpPopup onClose={mockOnClose} />);
    expect(screen.getByText('About This Site')).toBeInTheDocument();
    expect(screen.getByText(/This site helps you create a personalized Mother’s Day message!/i)).toBeInTheDocument();
  });

  it('calls onClose when the "Got it!" button is clicked', () => {
    render(<HelpPopup onClose={mockOnClose} />);
    const gotItButton = screen.getByRole('button', { name: /got it!/i });
    fireEvent.click(gotItButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the close button (×) is clicked', () => {
    render(<HelpPopup onClose={mockOnClose} />);
    const closeButton = screen.getByRole('button', { name: /close help popup/i }); // Using aria-label
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the backdrop is clicked', () => {
    render(<HelpPopup onClose={mockOnClose} />);
    // The backdrop is the outermost div
    const backdrop = screen.getByText('About This Site').parentElement?.parentElement?.parentElement;
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    } else {
      throw new Error('Backdrop element not found');
    }
  });

  it('does not call onClose when content inside the popup is clicked', () => {
    render(<HelpPopup onClose={mockOnClose} />);
    const contentText = screen.getByText(/This site helps you create a personalized Mother’s Day message!/i);
    fireEvent.click(contentText);
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
