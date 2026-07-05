import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';
import '@testing-library/jest-dom';

describe('Button', () => {
  test('renders with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('applies primary variant by default', () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByRole('button', { name: 'Primary Button' });
    expect(button).toHaveClass('primary'); // Checks for primary class from CSS module
    expect(button).not.toHaveClass('secondary');
    expect(button).not.toHaveClass('ghost');
  });

  test('applies secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole('button', { name: 'Secondary Button' });
    expect(button).toHaveClass('secondary');
    expect(button).not.toHaveClass('primary');
  });

  test('applies ghost variant', () => {
    render(<Button variant="ghost">Ghost Button</Button>);
    const button = screen.getByRole('button', { name: 'Ghost Button' });
    expect(button).toHaveClass('ghost');
    expect(button).not.toHaveClass('primary');
  });

  test('handles onClick event', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    fireEvent.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders in disabled state', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('passes additional props to the button element', () => {
    render(<Button type="submit" aria-label="submit-button">Submit</Button>);
    const button = screen.getByRole('button', { name: 'submit-button' });
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('merges custom className', () => {
    render(<Button className="custom-class">Custom Class Button</Button>);
    const button = screen.getByRole('button', { name: 'Custom Class Button' });
    expect(button).toHaveClass('custom-class');
  });
});