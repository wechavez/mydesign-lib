# MyDesign Web Components Library

MyDesign is a lightweight, customizable set of web components that can be used in any web application, regardless of the framework or technology stack you're using. These components follow the Web Components standard, making them framework-agnostic and easy to integrate.

## Storybook
https://wechavez.github.io/mydesign-lib/

## Live Demo
- Angular: https://wc-lib-angular-demo.vercel.app/
- React: https://wc-lib-react-demo.vercel.app/

## Installation

```bash
# Using npm
npm install @wechavez/wc-lib

# Using yarn
yarn add @wechavez/wc-lib

# Using pnpm
pnpm add @wechavez/wc-lib
```

## Usage

You can use these components in any HTML file or web application by importing them:

### Via ES Modules (Recommended)

```javascript
// Import all components
import "@wechavez/wc-lib";

// Or import specific components
import { MyButton, MyBadge, MyCard, MyModal } from "@wechavez/wc-lib";
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

### MyBadge

A versatile badge component for displaying labels, status indicators, counts, or any highlighting information with multiple visual variants and colors.

#### Usage

```html
<!-- Basic usage -->
<my-badge>Default</my-badge>

<!-- With attributes -->
<my-badge variant="filled" color="primary" size="medium">Badge Text</my-badge>

<!-- Status indicators -->
<my-badge variant="soft" color="success">Active</my-badge>
<my-badge variant="soft" color="warning">Pending</my-badge>
<my-badge variant="soft" color="danger">Inactive</my-badge>

<!-- Count badges -->
<my-badge variant="filled" color="danger" size="small">3</my-badge>

<!-- Outlined badges -->
<my-badge variant="outlined" color="info">Draft</my-badge>
```

#### Attributes

- `variant`: Defines the badge visual style

  - `filled` (default) - Solid background with contrasting text
  - `outlined` - Transparent background with colored border and text
  - `soft` - Light background with darker text in the same color family

- `color`: Controls the badge color theme

  - `primary` (default) - Blue theme
  - `secondary` - Gray theme
  - `success` - Green theme for positive states
  - `warning` - Yellow/orange theme for cautionary states
  - `danger` - Red theme for error or critical states
  - `info` - Blue theme for informational content
  - `neutral` - Dark gray theme for neutral content

- `size`: Controls the badge size

  - `small` - Compact size (0.75rem font, 1.25rem min-height)
  - `medium` (default) - Standard size (0.875rem font, 1.5rem min-height)
  - `large` - Larger size (1rem font, 2rem min-height)

#### Behavior

- Badges have a subtle hover effect that slightly scales the element
- All variants respond to hover with appropriate visual feedback
- Content is displayed using the default slot, allowing for text or other inline elements

#### Examples

```html
<!-- Status badges with soft variant -->
<div>
  <my-badge variant="soft" color="success" size="small">Online</my-badge>
  <my-badge variant="soft" color="warning" size="small">Away</my-badge>
  <my-badge variant="soft" color="danger" size="small">Offline</my-badge>
</div>

<!-- Notification count badge -->
<div style="position: relative; display: inline-block;">
  <button>Messages</button>
  <my-badge 
    variant="filled" 
    color="danger" 
    size="small" 
    style="position: absolute; top: -8px; right: -8px;"
  >5</my-badge>
</div>

<!-- Category labels with outlined variant -->
<div>
  <my-badge variant="outlined" color="info">Technology</my-badge>
  <my-badge variant="outlined" color="success">Environment</my-badge>
  <my-badge variant="outlined" color="warning">Business</my-badge>
</div>
```

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
