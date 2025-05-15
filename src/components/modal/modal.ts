export class MyModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return ["open"];
  }

  get open() {
    return this.hasAttribute("open");
  }

  set open(value: boolean) {
    if (value) {
      this.setAttribute("open", "");
    } else {
      this.removeAttribute("open");
    }
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          visibility: hidden;
          opacity: 0;
          transition: visibility 0s linear 0.25s, opacity 0.25s;
          z-index: 1000;
        }
        
        .modal-backdrop.open {
          visibility: visible;
          opacity: 1;
          transition-delay: 0s;
        }
        
        .modal-container {
          background: white;
          border-radius: 8px;
          padding: 24px;
          width: auto;
          max-width: 500px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 5px 15px rgba(0,0,0,0.5);
          position: relative;
          transform: scale(0.8);
          transition: transform 0.25s;
        }
        
        .modal-backdrop.open .modal-container {
          transform: scale(1);
        }
        
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #999;
        }
        
        .close-button:hover {
          color: #333;
        }
        
        .modal-header {
          margin-bottom: 16px;
        }
        
        .modal-body {
          margin-bottom: 24px;
        }
        
        .modal-footer {
          display: flex;
          justify-content: flex-end;
        }
      </style>
      <div class="modal-backdrop ${this.open ? "open" : ""}">
        <div class="modal-container">
          <button class="close-button">&times;</button>
          <div class="modal-header">
            <slot name="header"></slot>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;

    // Add event listeners
    const closeButton = this.shadowRoot.querySelector(".close-button");
    const backdrop = this.shadowRoot.querySelector(".modal-backdrop");

    if (closeButton) {
      closeButton.addEventListener("click", () => {
        this.open = false;
      });
    }

    if (backdrop) {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) {
          this.open = false;
        }
      });
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "open") {
      this.render();
      this.dispatchEvent(
        new CustomEvent("modal-state-change", {
          detail: { open: this.open },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  connectedCallback() {
    // Add keyboard event listener to handle ESC key
    this.escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && this.open) {
        this.open = false;
      }
    };

    document.addEventListener("keydown", this.escHandler);
  }

  disconnectedCallback() {
    document.removeEventListener("keydown", this.escHandler);
  }

  // Property to store the ESC key handler
  private escHandler: (e: KeyboardEvent) => void = () => {};
}

customElements.define("my-modal", MyModal);
