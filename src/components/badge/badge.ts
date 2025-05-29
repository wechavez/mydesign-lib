export class MyBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return ["variant", "color", "size"];
  }

  get variant() {
    return this.getAttribute("variant") || "filled";
  }

  set variant(value: string) {
    this.setAttribute("variant", value);
  }

  get color() {
    return this.getAttribute("color") || "primary";
  }

  set color(value: string) {
    this.setAttribute("color", value);
  }

  get size() {
    return this.getAttribute("size") || "medium";
  }

  set size(value: string) {
    this.setAttribute("size", value);
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-weight: 500;
          line-height: 1;
          border-radius: 9999px;
          white-space: nowrap;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        /* Size variants */
        .small {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          min-height: 1.25rem;
        }

        .medium {
          font-size: 0.875rem;
          padding: 0.375rem 0.75rem;
          min-height: 1.5rem;
        }

        .large {
          font-size: 1rem;
          padding: 0.5rem 1rem;
          min-height: 2rem;
        }

        /* Filled variant - Primary colors */
        .filled.primary {
          background-color: #0066cc;
          color: white;
        }

        .filled.secondary {
          background-color: #6b7280;
          color: white;
        }

        .filled.success {
          background-color: #10b981;
          color: white;
        }

        .filled.warning {
          background-color: #f59e0b;
          color: white;
        }

        .filled.danger {
          background-color: #ef4444;
          color: white;
        }

        .filled.info {
          background-color: #3b82f6;
          color: white;
        }

        .filled.neutral {
          background-color: #374151;
          color: white;
        }

        /* Outlined variant */
        .outlined.primary {
          background-color: transparent;
          color: #0066cc;
          border-color: #0066cc;
        }

        .outlined.secondary {
          background-color: transparent;
          color: #6b7280;
          border-color: #6b7280;
        }

        .outlined.success {
          background-color: transparent;
          color: #10b981;
          border-color: #10b981;
        }

        .outlined.warning {
          background-color: transparent;
          color: #f59e0b;
          border-color: #f59e0b;
        }

        .outlined.danger {
          background-color: transparent;
          color: #ef4444;
          border-color: #ef4444;
        }

        .outlined.info {
          background-color: transparent;
          color: #3b82f6;
          border-color: #3b82f6;
        }

        .outlined.neutral {
          background-color: transparent;
          color: #374151;
          border-color: #374151;
        }

        /* Soft variant */
        .soft.primary {
          background-color: #dbeafe;
          color: #1d4ed8;
        }

        .soft.secondary {
          background-color: #f3f4f6;
          color: #374151;
        }

        .soft.success {
          background-color: #d1fae5;
          color: #065f46;
        }

        .soft.warning {
          background-color: #fef3c7;
          color: #92400e;
        }

        .soft.danger {
          background-color: #fee2e2;
          color: #991b1b;
        }

        .soft.info {
          background-color: #dbeafe;
          color: #1e40af;
        }

        .soft.neutral {
          background-color: #f3f4f6;
          color: #374151;
        }

        /* Hover effects */
        .badge:hover {
          transform: scale(1.05);
        }

        .filled:hover {
          opacity: 0.9;
        }

        .outlined:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .soft:hover {
          opacity: 0.8;
        }
      </style>
      <span class="badge ${this.variant} ${this.color} ${this.size}">
        <slot></slot>
      </span>
    `;
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define("my-badge", MyBadge); 