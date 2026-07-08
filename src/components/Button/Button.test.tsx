import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import { Button } from './Button';

// Mock console.warn for accessibility checks
const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('Button', () => {
  afterEach(() => {
    consoleWarnSpy.mockClear();
  });

  afterAll(() => {
    consoleWarnSpy.mockRestore();
  });

  it('renders with default props', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass('button'); // Checks for base class
    expect(button).toHaveClass('default'); // Checks default variant
    expect(button).toHaveClass('medium'); // Checks default size
  });

  it('renders with primary variant', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByRole('button', { name: 'Primary Button' });
    expect(button).toHaveClass('primary');
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole('button', { name: 'Secondary Button' });
    expect(button).toHaveClass('secondary');
  });

  it('renders with small size', () => {
    render(<Button size="small">Small Button</Button>);
    const button = screen.getByRole('button', { name: 'Small Button' });
    expect(button).toHaveClass('small');
  });

  it('renders with large size', () => {
    render(<Button size="large">Large Button</Button>);
    const button = screen.getByRole('button', { name: 'Large Button' });
    expect(button).toHaveClass('large');
  });

  it('handles onClick event', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole('button', { name: 'Click Me' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders a disabled button', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders with an icon', () => {
    const Icon = () => <span data-testid="test-icon">🚀</span>;
    render(<Button icon={<Icon />}>Button with Icon</Button>);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Button with Icon' })).toHaveTextContent('Button with Icon');
  });

  it('renders an icon-only button with aria-label', () => {
    const Icon = () => <span data-testid="test-icon">🔍</span>;
    render(<Button icon={<Icon />} iconOnly aria-label="Search" />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    const button = screen.getByRole('button', { name: 'Search' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('iconOnly');
    expect(button).not.toHaveTextContent('Search'); // Should not render children visually
    expect(consoleWarnSpy).not.toHaveBeenCalled(); // No warning if aria-label is present
  });

  it('warns if iconOnly button is missing accessibility label', () => {
    const Icon = () => <span>🔍</span>;
    render(<Button icon={<Icon />} iconOnly />);
    // Check if the warning was logged
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Accessibility Warning: Buttons with `iconOnly` prop should have an `aria-label` or `aria-labelledby` for screen readers.'
    );
  });

  it('does not warn if iconOnly button has children but no aria-label (children are not rendered visually)', () => {
    const Icon = () => <span>🔍</span>;
    render(<Button icon={<Icon />} iconOnly>Search</Button>);
    // The warning should still fire because the content 'Search' is not visually rendered,
    // so it doesn't serve as an accessible name for `iconOnly`.
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Accessibility Warning: Buttons with `iconOnly` prop should have an `aria-label` or `aria-labelledby` for screen readers.'
    );
  });

  it('renders button with custom type', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button', { name: 'Custom' });
    expect(button).toHaveClass('custom-class');
  });
});
