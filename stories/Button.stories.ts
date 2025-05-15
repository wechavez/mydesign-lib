import { html } from "lit-html";
import "../src/components/button/button";

export default {
  title: "Components/Button",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "danger", "success"],
      description: "Defines the button style",
      defaultValue: "primary",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Controls the button size",
      defaultValue: "medium",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "medium" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the button when true",
      defaultValue: false,
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    label: {
      control: "text",
      description: "Button text",
      defaultValue: "Button",
    },
    onClick: { action: "clicked" },
  },
};

const Template = ({ label, variant, size, disabled }) => {
  return html`
    <my-button
      variant=${variant}
      size=${size}
      ?disabled=${disabled}
      @click=${(e) => console.log("Button clicked:", e)}
    >
      ${label}
    </my-button>
  `;
};

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  label: "Primary Button",
  size: "medium",
  disabled: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  label: "Secondary Button",
  size: "medium",
  disabled: false,
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
  label: "Danger Button",
  size: "medium",
  disabled: false,
};

export const Success = Template.bind({});
Success.args = {
  variant: "success",
  label: "Success Button",
  size: "medium",
  disabled: false,
};

export const Small = Template.bind({});
Small.args = {
  variant: "primary",
  label: "Small Button",
  size: "small",
  disabled: false,
};

export const Large = Template.bind({});
Large.args = {
  variant: "primary",
  label: "Large Button",
  size: "large",
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: "primary",
  label: "Disabled Button",
  size: "medium",
  disabled: true,
};
