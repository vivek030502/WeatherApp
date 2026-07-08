import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Example icon (you'd typically import an SVG or icon component)
const SearchIcon = () => (
  <img src="images/search.png" alt="Search" style={{ width: 16, height: 16 }} />
);

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
    variant: {
      control: 'radio',
      options: ['default', 'primary', 'secondary'],
      description: 'Defines the visual style of the button.',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Defines the size of the button.',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the button will be disabled.',
    },
    icon: {
      control: 'boolean', // Represent icon presence with boolean for storybook
      mapping: {
        true: <SearchIcon />,
        false: undefined,
      },
      description: 'Optional icon to display inside the button. Set to true to display a search icon.',
    },
    iconOnly: {
      control: 'boolean',
      description: 'If true, the button will only display the icon. `children` will be ignored visually. An `aria-label` is highly recommended.',
    },
    onClick: { action: 'clicked' },
    type: {
      control: 'radio',
      options: ['button', 'submit', 'reset'],
      description: 'The type of the button.',
    },
    'aria-label': {
      control: 'text',
      description: 'Defines a string value that labels the current element.',
    },
  },
  args: {
    children: 'Click Me',
    variant: 'default',
    size: 'medium',
    disabled: false,
    icon: undefined,
    iconOnly: false,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

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

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'large',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Search',
    icon: <SearchIcon />,
    variant: 'primary',
  },
};

export const IconOnly: Story = {
  args: {
    icon: <SearchIcon />,
    iconOnly: true,
    'aria-label': 'Search City', // Essential for accessibility
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
    variant: 'primary',
  },
};

export const DisabledWithIcon: Story = {
  args: {
    children: 'Disabled Search',
    icon: <SearchIcon />,
    disabled: true,
  },
};

export const DisabledIconOnly: Story = {
  args: {
    icon: <SearchIcon />,
    iconOnly: true,
    disabled: true,
    'aria-label': 'Search City (Disabled)',
  },
};

export const SubmitButton: Story = {
  args: {
    children: 'Submit Form',
    type: 'submit',
    variant: 'primary',
  },
};
