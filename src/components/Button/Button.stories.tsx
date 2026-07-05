import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The content of the button.',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback function triggered when the button is clicked.',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'The visual style of the button.',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the button will be disabled.',
    },
    className: {
      control: 'text',
      description: 'Optional custom CSS class name.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const WithCustomClassName: Story = {
  args: {
    children: 'Custom Class',
    className: 'my-custom-button',
  },
  // You might need to add a global CSS file or modify Storybook's preview.js
  // to see the effects of 'my-custom-button' class if it's not defined globally.
};

export const LongText: Story = {
  args: {
    children: 'This is a button with a very long text to demonstrate how it handles wider content',
    variant: 'primary',
  },
};
