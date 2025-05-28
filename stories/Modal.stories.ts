import { html } from "lit-html";
import "../src/components/modal/modal";
import "../src/components/button/button"; // For the open/close buttons

export default {
  title: "Components/Modal",
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Controls whether the modal is open",
      defaultValue: false,
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    headerContent: {
      control: "text",
      description: "Content for the modal header",
      defaultValue: "Modal Title",
    },
    bodyContent: {
      control: "text",
      description: "Content for the modal body",
      defaultValue: "This is the modal content.",
    },
    footerContent: {
      control: "text",
      description: "Content for the modal footer",
      defaultValue: "",
    },
    onModalStateChange: { action: "modal-state-change" },
  },
  parameters: {
    docs: {
      description: {
        component: `
The MyModal component creates a customizable modal dialog.

It supports:
- Showing/hiding with the \`open\` attribute
- Content slots for header, body, and footer
- Close button in the top-right corner
- Closing when clicking outside the modal
- Closing when pressing the ESC key
- Custom styling via CSS variables
        `,
      },
    },
  },
};

const Template = ({
  open,
  headerContent,
  bodyContent,
  footerContent,
  onModalStateChange,
}) => {
  // We need a controller element because Storybook controls don't directly manipulate the DOM
  return html`
    <div>
      <my-button
        variant="primary"
        @click=${(e) => {
          // Get the modal within this story's container
          const modal = e.target.parentElement.querySelector("my-modal");
          if (modal) {
            modal.setAttribute("open", "");
          }
        }}
      >
        Open Modal
      </my-button>

      <my-modal ?open=${open} @modal-state-change=${onModalStateChange}>
        <div slot="header">
          <h2>${headerContent}</h2>
        </div>
        <p>${bodyContent}</p>
        <div slot="footer">
          ${footerContent ||
          html`
            <my-button
              variant="secondary"
              size="small"
              @click=${(e) => {
                // Find the closest modal to this button
                const modal = e.target.closest("my-modal");
                if (modal) {
                  modal.removeAttribute("open");
                }
              }}
            >
              Cancel
            </my-button>
            <my-button
              variant="primary"
              size="small"
              @click=${(e) => {
                // Find the closest modal to this button
                const modal = e.target.closest("my-modal");
                if (modal) {
                  modal.removeAttribute("open");
                }
              }}
            >
              Confirm
            </my-button>
          `}
        </div>
      </my-modal>
    </div>
  `;
};

// New template specifically for custom footer content
const CustomFooterTemplate = ({
  open,
  headerContent,
  bodyContent,
  onModalStateChange,
}) => {
  return html`
    <div>
      <my-button
        variant="primary"
        @click=${(e) => {
          const modal = e.target.parentElement.querySelector("my-modal");
          if (modal) {
            modal.setAttribute("open", "");
          }
        }}
      >
        Open Modal
      </my-button>

      <my-modal ?open=${open} @modal-state-change=${onModalStateChange}>
        <div slot="header">
          <h2>${headerContent}</h2>
        </div>
        <p>${bodyContent}</p>
        <div slot="footer">
          <my-button
            variant="danger"
            size="small"
            @click=${(e) => {
              const modal = e.target.closest("my-modal");
              if (modal) {
                modal.removeAttribute("open");
              }
            }}
          >
            Delete
          </my-button>
        </div>
      </my-modal>
    </div>
  `;
};

const LongContentTemplate = ({
  open,
  headerContent,
  bodyContent,
  onModalStateChange,
}) => {
  return html`
    <div>
      <my-button
        variant="primary"
        @click=${(e) => {
          const modal = e.target.parentElement.querySelector("my-modal");
          if (modal) {
            modal.setAttribute("open", "");
          }
        }}
      >
        Open Modal
      </my-button>

      <my-modal ?open=${open} @modal-state-change=${onModalStateChange}>
        <div slot="header">
          <h2>${headerContent}</h2>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            euismod, nisl eget aliquam ultricies, quam sapien aliquet nunc,
            vitae aliquam nisl nisl vitae nisl.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            euismod, nisl eget aliquam ultricies, quam sapien aliquet nunc,
            vitae aliquam nisl nisl vitae nisl.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            euismod, nisl eget aliquam ultricies, quam sapien aliquet nunc,
            vitae aliquam nisl nisl vitae nisl.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            euismod, nisl eget aliquam ultricies, quam sapien aliquet nunc,
            vitae aliquam nisl nisl vitae nisl.
          </p>
        </div>
        <div slot="footer">
          <my-button
            variant="primary"
            size="small"
            @click=${(e) => {
              const modal = e.target.closest("my-modal");
              if (modal) {
                modal.removeAttribute("open");
              }
            }}
            >Close</my-button
          >
        </div>
      </my-modal>
    </div>
  `;
};

export const Default = Template.bind({});
Default.args = {
  open: false,
  headerContent: "Modal Title",
  bodyContent: "This is the modal content.",
  footerContent: "",
};

export const InitiallyOpen = Template.bind({});
InitiallyOpen.args = {
  open: true,
  headerContent: "Modal Title",
  bodyContent: "This modal is initially open.",
  footerContent: "",
};

export const WithCustomFooter = CustomFooterTemplate.bind({});
WithCustomFooter.args = {
  open: false,
  headerContent: "Custom Footer",
  bodyContent: "This modal has a custom footer with a delete button.",
};

export const LongContent = LongContentTemplate.bind({});
LongContent.args = {
  open: false,
  headerContent: "Long Content Modal",
};

export const NoFooter = Template.bind({});
NoFooter.args = {
  open: false,
  headerContent: "Modal Without Footer",
  bodyContent: "This modal has no footer buttons.",
  footerContent: " ", // space character to override default buttons
};
