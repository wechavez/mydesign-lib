import { FONT_FAMILY } from '../../styles/fonts';

export class MyCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return ["elevation", "border"];
  }

  get elevation() {
    return this.getAttribute("elevation") || "1";
  }

  set elevation(value: string) {
    this.setAttribute("elevation", value);
  }

  get border() {
    return this.hasAttribute("border");
  }

  set border(value: boolean) {
    if (value) {
      this.setAttribute("border", "");
    } else {
      this.removeAttribute("border");
    }
  }

  render() {
    if (!this.shadowRoot) return;

    const elevationMap: { [key: string]: string } = {
      "0": "none",
      "1": "0 2px 4px rgba(0,0,0,0.1)",
      "2": "0 4px 8px rgba(0,0,0,0.1)",
      "3": "0 8px 16px rgba(0,0,0,0.1)",
      "4": "0 16px 24px rgba(0,0,0,0.1)",
      "5": "0 24px 32px rgba(0,0,0,0.1)",
    };

    const shadowValue = elevationMap[this.elevation] || elevationMap["1"];
    const borderStyle = this.border ? "1px solid #e0e0e0" : "none";

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background: white;
          border-radius: 8px;
          padding: 16px;
          box-sizing: border-box;
          box-shadow: ${shadowValue};
          border: ${borderStyle};
          display: block;
          font-family: ${FONT_FAMILY.primary};
        }
        
        .card-content {
          display: block;
        }
      </style>
      <div class="card">
        <div class="card-content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define("my-card", MyCard);
