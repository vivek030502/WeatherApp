import React from 'react';
import styles from './Button.module.css';
import { hasAccessibleLabel } from '../../utils/a11y';

export type ButtonVariant = 'default' | 'primary' | 'secondary';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The text content of the button.
   */
  children?: React.ReactNode;
  /**
   * Defines the visual style of the button.
   * @default 'default'
   */
  variant?: ButtonVariant;
  /**
   * Defines the size of the button.
   * @default 'medium'
   */
  size?: ButtonSize;
  /**
   * If true, the button will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Optional icon to display inside the button.
   */
  icon?: React.ReactNode;
  /**
   * If true, the button will only display the icon. `children` will be ignored visually.
   * An `aria-label` is highly recommended when `iconOnly` is true.
   * @default false
   */
  iconOnly?: boolean;
  /**
   * Custom class name for the button.
   */
  className?: string;
  /**
   * The type of the button.
   * @default 'button'
   */
  type?: ButtonType;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  disabled = false,
  icon,
  iconOnly = false,
  className,
  type = 'button',
  onClick,
  onMouseDown, // Include onMouseDown to prevent focus loss if needed (common for button components)
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...rest
}) => {
  const combinedClassName = [
    styles.button,
    styles[variant],
    styles[size],
    iconOnly && styles.iconOnly,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Enforce accessibility for iconOnly buttons
  if (iconOnly && !hasAccessibleLabel(undefined, ariaLabel, ariaLabelledBy)) {
    console.warn(
      'Accessibility Warning: Buttons with `iconOnly` prop should have an `aria-label` or `aria-labelledby` for screen readers.'
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={onMouseDown}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      {...rest}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {!iconOnly && children}
    </button>
  );
};
