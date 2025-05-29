import { html } from "lit-html";
import "../src/components/badge/badge";

export default {
  title: "Components/Badge",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["filled", "outlined", "soft"],
      description: "Defines the badge style variant",
      defaultValue: "filled",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "filled" },
      },
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "warning", "danger", "info", "neutral"],
      description: "Defines the badge color theme",
      defaultValue: "primary",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Controls the badge size",
      defaultValue: "medium",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "medium" },
      },
    },
    label: {
      control: "text",
      description: "Badge text content",
      defaultValue: "Badge",
    },
  },
  parameters: {
    docs: {
      description: {
        component: "A versatile badge component with multiple variants, colors, and sizes. Perfect for displaying status, labels, counts, or any kind of highlighting information.",
      },
    },
  },
};

const Template = ({ label, variant, color, size }) => {
  return html`
    <my-badge
      variant=${variant}
      color=${color}
      size=${size}
    >
      ${label}
    </my-badge>
  `;
};

// Default story
export const Default = Template.bind({});
Default.args = {
  variant: "filled",
  color: "primary",
  size: "medium",
  label: "Badge",
};

// Variant stories
export const Filled = Template.bind({});
Filled.args = {
  variant: "filled",
  color: "primary",
  size: "medium",
  label: "Filled",
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: "outlined",
  color: "primary",
  size: "medium",
  label: "Outlined",
};

export const Soft = Template.bind({});
Soft.args = {
  variant: "soft",
  color: "primary",
  size: "medium",
  label: "Soft",
};

// Color stories
export const Primary = Template.bind({});
Primary.args = {
  variant: "filled",
  color: "primary",
  size: "medium",
  label: "Primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "filled",
  color: "secondary",
  size: "medium",
  label: "Secondary",
};

export const Success = Template.bind({});
Success.args = {
  variant: "filled",
  color: "success",
  size: "medium",
  label: "Success",
};

export const Warning = Template.bind({});
Warning.args = {
  variant: "filled",
  color: "warning",
  size: "medium",
  label: "Warning",
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "filled",
  color: "danger",
  size: "medium",
  label: "Danger",
};

export const Info = Template.bind({});
Info.args = {
  variant: "filled",
  color: "info",
  size: "medium",
  label: "Info",
};

export const Neutral = Template.bind({});
Neutral.args = {
  variant: "filled",
  color: "neutral",
  size: "medium",
  label: "Neutral",
};

// Size stories
export const Small = Template.bind({});
Small.args = {
  variant: "filled",
  color: "primary",
  size: "small",
  label: "Small",
};

export const Medium = Template.bind({});
Medium.args = {
  variant: "filled",
  color: "primary",
  size: "medium",
  label: "Medium",
};

export const Large = Template.bind({});
Large.args = {
  variant: "filled",
  color: "primary",
  size: "large",
  label: "Large",
};

// Combination showcase
export const AllVariants = () => html`
  <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
    <my-badge variant="filled" color="primary">Filled</my-badge>
    <my-badge variant="outlined" color="primary">Outlined</my-badge>
    <my-badge variant="soft" color="primary">Soft</my-badge>
  </div>
`;

export const AllColors = () => html`
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
    <my-badge variant="filled" color="primary">Primary</my-badge>
    <my-badge variant="filled" color="secondary">Secondary</my-badge>
    <my-badge variant="filled" color="success">Success</my-badge>
    <my-badge variant="filled" color="warning">Warning</my-badge>
    <my-badge variant="filled" color="danger">Danger</my-badge>
    <my-badge variant="filled" color="info">Info</my-badge>
    <my-badge variant="filled" color="neutral">Neutral</my-badge>
  </div>
`;

export const AllSizes = () => html`
  <div style="display: flex; gap: 1rem; align-items: center;">
    <my-badge variant="filled" color="primary" size="small">Small</my-badge>
    <my-badge variant="filled" color="primary" size="medium">Medium</my-badge>
    <my-badge variant="filled" color="primary" size="large">Large</my-badge>
  </div>
`;

export const StatusBadges = () => html`
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
    <my-badge variant="soft" color="success" size="small">Active</my-badge>
    <my-badge variant="soft" color="warning" size="small">Pending</my-badge>
    <my-badge variant="soft" color="danger" size="small">Inactive</my-badge>
    <my-badge variant="outlined" color="info" size="small">Draft</my-badge>
    <my-badge variant="filled" color="neutral" size="small">Archived</my-badge>
  </div>
`;

export const CountBadges = () => html`
  <div style="display: flex; gap: 1rem; align-items: center;">
    <div style="position: relative; display: inline-block;">
      <span style="padding: 0.5rem 1rem; background: #f3f4f6; border-radius: 0.5rem;">Notifications</span>
      <my-badge variant="filled" color="danger" size="small" style="position: absolute; top: -0.5rem; right: -0.5rem;">3</my-badge>
    </div>
    <div style="position: relative; display: inline-block;">
      <span style="padding: 0.5rem 1rem; background: #f3f4f6; border-radius: 0.5rem;">Messages</span>
      <my-badge variant="filled" color="primary" size="small" style="position: absolute; top: -0.5rem; right: -0.5rem;">12</my-badge>
    </div>
  </div>
`; 