# MyDesign Web Components Library

MyDesign is a lightweight, customizable set of web components that can be used in any web application, regardless of the framework or technology stack you're using. These components follow the Web Components standard, making them framework-agnostic and easy to integrate.

## Installation

```bash
# Using npm
npm install wec-mydesign-lib

# Using yarn
yarn add wec-mydesign-lib

# Using pnpm
pnpm add wec-mydesign-lib
```

## Usage

You can use these components in any HTML file or web application by importing them:

### Via ES Modules (Recommended)

```javascript
// Import all components
import "wec-mydesign-lib";

// Or import specific components
import { MyButton, MyCard, MyModal } from "wec-mydesign-lib";
```

## Components

### MyButton

A customizable button component with different variants and sizes.

#### Usage

```html
<my-button variant="primary" size="medium">Click Me</my-button>
```

#### Attributes

- `variant`: Defines the button style

  - `primary` (default) - Blue button with white text
  - `secondary` - Light gray button with dark text
  - `danger` - Red button for destructive actions
  - `success` - Green button for positive actions

- `size`: Controls the button size

  - `small` - Smaller text and padding
  - `medium` (default) - Standard size
  - `large` - Larger text and padding

- `disabled`: Boolean attribute that disables the button when present

#### Events

- `click`: Standard click event (not fired when button is disabled)

```javascript
document.querySelector("my-button").addEventListener("click", () => {
  console.log("Button clicked!");
});
```

### MyCard

A card component for grouping content with customizable elevation and border.

#### Usage

```html
<my-card elevation="2" border>
  <h3>Card Title</h3>
  <p>This is some content inside the card.</p>
</my-card>
```

#### Attributes

- `elevation`: Controls the shadow depth (0-5)

  - `0` - No shadow
  - `1` (default) - Light shadow
  - `2`, `3`, `4`, `5` - Progressively more pronounced shadows

- `border`: Boolean attribute that adds a border when present

### MyModal

A modal dialog component that can be toggled open and closed.

#### Usage

```html
<my-modal id="example-modal">
  <h2 slot="header">Modal Title</h2>
  <p>This is the modal content.</p>
  <div slot="footer">
    <my-button variant="secondary" id="cancel-btn">Cancel</my-button>
    <my-button variant="primary" id="confirm-btn">Confirm</my-button>
  </div>
</my-modal>

<my-button id="open-modal-btn">Open Modal</my-button>

<script>
  const modal = document.getElementById("example-modal");
  const openBtn = document.getElementById("open-modal-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const confirmBtn = document.getElementById("confirm-btn");

  openBtn.addEventListener("click", () => {
    modal.open = true;
  });

  cancelBtn.addEventListener("click", () => {
    modal.open = false;
  });

  confirmBtn.addEventListener("click", () => {
    // Do something
    modal.open = false;
  });

  modal.addEventListener("modal-state-change", (e) => {
    console.log("Modal open state:", e.detail.open);
  });
</script>
```

#### Attributes

- `open`: Boolean attribute that controls the visibility of the modal

#### Slots

- Default slot: Main content of the modal
- `header`: Content for the modal header
- `footer`: Content for the modal footer (typically action buttons)

#### Events

- `modal-state-change`: Fired when the modal opens or closes
  - `detail.open`: Boolean indicating if the modal is open

#### Behavior

- Clicking the close button (×) closes the modal
- Clicking outside the modal content closes the modal
- Pressing the ESC key closes the modal

## Styling

All components use Shadow DOM to encapsulate their styles, but you can customize the appearance using CSS variables (future implementation) or by extending the components.

## Browser Support

These components work in all modern browsers that support Web Components:

- Chrome
- Firefox
- Safari
- Edge (Chromium-based)

## License

ISC
