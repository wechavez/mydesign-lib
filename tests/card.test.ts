import { describe, it, expect, beforeEach } from "vitest";
import "../src/components/card/card";

describe("MyCard Component", () => {
  let cardElement: HTMLElement;

  beforeEach(() => {
    // Create a new card element before each test
    document.body.innerHTML = "";
    cardElement = document.createElement("my-card");
    cardElement.textContent = "Card Content";
    document.body.appendChild(cardElement);
  });

  it("should render with default properties", () => {
    const shadowRoot = cardElement.shadowRoot;
    const cardDiv = shadowRoot?.querySelector(".card");

    expect(cardDiv).not.toBeNull();
    expect(cardElement.textContent).toBe("Card Content");
  });

  it("should apply border when border attribute is set", () => {
    cardElement.setAttribute("border", "");

    const shadowRoot = cardElement.shadowRoot;
    const cardStyle = window.getComputedStyle(
      shadowRoot?.querySelector(".card") as Element
    );

    // In jsdom we can't directly check the computed style, so we check the inline style
    const styleContent = shadowRoot?.querySelector("style")?.textContent;
    expect(styleContent).toContain("border: 1px solid #e0e0e0");
  });

  it("should apply correct elevation shadow", () => {
    // Default elevation is 1
    let shadowRoot = cardElement.shadowRoot;
    let styleContent = shadowRoot?.querySelector("style")?.textContent;
    expect(styleContent).toContain("box-shadow: 0 2px 4px rgba(0,0,0,0.1)");

    // Change elevation to 3
    cardElement.setAttribute("elevation", "3");
    styleContent = shadowRoot?.querySelector("style")?.textContent;
    expect(styleContent).toContain("box-shadow: 0 8px 16px rgba(0,0,0,0.1)");
  });

  it("should update when attributes change", () => {
    cardElement.setAttribute("elevation", "4");
    cardElement.setAttribute("border", "");

    const shadowRoot = cardElement.shadowRoot;
    const styleContent = shadowRoot?.querySelector("style")?.textContent;

    expect(styleContent).toContain("box-shadow: 0 16px 24px rgba(0,0,0,0.1)");
    expect(styleContent).toContain("border: 1px solid #e0e0e0");
  });

  it("should remove border when border attribute is removed", () => {
    // First set border
    cardElement.setAttribute("border", "");
    let styleContent =
      cardElement.shadowRoot?.querySelector("style")?.textContent;
    expect(styleContent).toContain("border: 1px solid #e0e0e0");

    // Then remove it
    cardElement.removeAttribute("border");
    styleContent = cardElement.shadowRoot?.querySelector("style")?.textContent;
    expect(styleContent).toContain("border: none");
  });

  it("should handle elevation 0 correctly", () => {
    cardElement.setAttribute("elevation", "0");
    const styleContent =
      cardElement.shadowRoot?.querySelector("style")?.textContent;
    expect(styleContent).toContain("box-shadow: none");
  });

  it("should handle elevation 5 correctly", () => {
    cardElement.setAttribute("elevation", "5");
    const styleContent =
      cardElement.shadowRoot?.querySelector("style")?.textContent;
    expect(styleContent).toContain("box-shadow: 0 24px 32px rgba(0,0,0,0.1)");
  });

  it("should use default elevation when invalid elevation value is provided", () => {
    cardElement.setAttribute("elevation", "invalid");
    const styleContent =
      cardElement.shadowRoot?.querySelector("style")?.textContent;
    expect(styleContent).toContain("box-shadow: 0 2px 4px rgba(0,0,0,0.1)");
  });

  it("should have proper getter/setter for elevation property", () => {
    const card = document.querySelector("my-card") as any;

    // Test default
    expect(card.elevation).toBe("1");

    // Test setter
    card.elevation = "3";
    expect(card.getAttribute("elevation")).toBe("3");

    // Confirm reflection in shadow DOM
    const styleContent = card.shadowRoot?.querySelector("style")?.textContent;
    expect(styleContent).toContain("box-shadow: 0 8px 16px rgba(0,0,0,0.1)");
  });

  it("should have proper getter/setter for border property", () => {
    const card = document.querySelector("my-card") as any;

    // Test default
    expect(card.border).toBe(false);

    // Test setter - adding border
    card.border = true;
    expect(card.hasAttribute("border")).toBe(true);

    // Test setter - removing border
    card.border = false;
    expect(card.hasAttribute("border")).toBe(false);
  });

  it("should have correct structure in shadow DOM", () => {
    const shadowRoot = cardElement.shadowRoot;
    const card = shadowRoot?.querySelector(".card");
    const cardContent = shadowRoot?.querySelector(".card-content");
    const slot = shadowRoot?.querySelector("slot");

    expect(card).not.toBeNull();
    expect(cardContent).not.toBeNull();
    expect(slot).not.toBeNull();
    expect(cardContent?.parentElement).toBe(card);
    expect(slot?.parentElement).toBe(cardContent);
  });
});
