import { html } from "lit-html";
import "../src/components/card/card";

export default {
  title: "Components/Card",
  tags: ["autodocs"],
  argTypes: {
    elevation: {
      control: { type: "range", min: 0, max: 5, step: 1 },
      description: "Controls the shadow depth",
      defaultValue: 1,
      table: {
        type: { summary: "number (0-5)" },
        defaultValue: { summary: 1 },
      },
    },
    border: {
      control: "boolean",
      description: "Shows border when true",
      defaultValue: false,
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    content: {
      control: "text",
      description: "Card content",
      defaultValue: "Card Content",
    },
    title: {
      control: "text",
      description: "Card title",
      defaultValue: "Card Title",
    },
  },
};

const Template = ({ elevation, border, content, title }) => {
  return html`
    <my-card .elevation=${Number(elevation)} ?border=${border}>
      <h3>${title}</h3>
      <p>${content}</p>
    </my-card>
  `;
};

export const Default = Template.bind({});
Default.args = {
  elevation: 1,
  border: false,
  title: "Card Title",
  content: "This is some content inside the card.",
};

export const WithBorder = Template.bind({});
WithBorder.args = {
  elevation: 1,
  border: true,
  title: "Card with Border",
  content: "This card has a border.",
};

export const HighElevation = Template.bind({});
HighElevation.args = {
  elevation: 4,
  border: false,
  title: "High Elevation Card",
  content: "This card has a higher elevation (more shadow).",
};

export const NoElevation = Template.bind({});
NoElevation.args = {
  elevation: 0,
  border: true,
  title: "No Elevation Card",
  content: "This card has no elevation (flat) but has a border.",
};
