import React from 'react';
import styles from './Button.module.css';

// Define the possible button variants
type ButtonVariant = 'primary' | 'secondary' | 'ghost';

// Define the props for the Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The content to be rendered inside the button.
   */
  children: React.ReactNode;
  /**
   * Optional click handler.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * The visual style variant of the button.
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * If true, the button will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Optional custom CSS class name.
   */
  className?: string;
}

/**
 * Reusable Button UI component.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary', // Default variant
  disabled = false,
  className,
  ...rest
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
