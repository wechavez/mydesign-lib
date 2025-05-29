import { FONT_FAMILY } from '../../styles/fonts';

export class MyButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return ["variant", "size", "disabled"];
  }

  get variant() {
    return this.getAttribute("variant") || "primary";
  }

  set variant(value: string) {
    this.setAttribute("variant", value);
  }

  get size() {
    return this.getAttribute("size") || "medium";
  }

  set size(value: string) {
    this.setAttribute("size", value);
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        button {
          font-family: ${FONT_FAMILY.primary};
          padding: 0.5em 1em;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        button:hover:not([disabled]) {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        
        button:active:not([disabled]) {
          transform: translateY(1px);
        }
        
        button[disabled] {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .primary {
          background: #0066cc;
          color: white;
        }
        
        .secondary {
          background: #e6e6e6;
          color: #333;
        }
        
        .danger {
          background: #dc3545;
          color: white;
        }
        
        .success {
          background: #28a745;
          color: white;
        }
        
        .small {
          font-size: 0.8rem;
          padding: 0.3em 0.8em;
        }
        
        .medium {
          font-size: 1rem;
        }
        
        .large {
          font-size: 1.2rem;
          padding: 0.7em 1.2em;
        }
      </style>
      <button 
        class="${this.variant} ${this.size}"
        ${this.disabled ? "disabled" : ""}
      >
        <slot></slot>
      </button>
    `;

    // Add click event listener
    const button = this.shadowRoot.querySelector("button");
    if (button) {
      button.addEventListener("click", (e) => {
        if (!this.disabled) {
          this.dispatchEvent(
            new CustomEvent("click", {
              bubbles: true,
              composed: true,
            })
          );
        }
      });
    }
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define("my-button", MyButton);
