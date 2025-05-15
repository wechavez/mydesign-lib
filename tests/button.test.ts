import { describe, it, expect, beforeEach, vi } from "vitest";
import "../src/components/button/button";

describe("MyButton Component", () => {
  let buttonElement: HTMLElement;

  beforeEach(() => {
    // Create a new button element before each test
    document.body.innerHTML = "";
    buttonElement = document.createElement("my-button");
    buttonElement.textContent = "Click Me";
    document.body.appendChild(buttonElement);
  });

  it("should render with default properties", () => {
    // Use shadow root to test inner details
    const shadowRoot = buttonElement.shadowRoot;
    const button = shadowRoot?.querySelector("button");

    expect(button).not.toBeNull();
    expect(button?.classList.contains("primary")).toBe(true);
    expect(button?.classList.contains("medium")).toBe(true);
    expect(button?.textContent?.trim()).toBe(""); // Text content is in the slot
    expect(buttonElement.textContent).toBe("Click Me");
  });

  it("should change variant when attribute is set", () => {
    buttonElement.setAttribute("variant", "secondary");

    const shadowRoot = buttonElement.shadowRoot;
    const button = shadowRoot?.querySelector("button");

    expect(button?.classList.contains("secondary")).toBe(true);
    expect(button?.classList.contains("primary")).toBe(false);
  });

  it("should change size when attribute is set", () => {
    buttonElement.setAttribute("size", "large");

    const shadowRoot = buttonElement.shadowRoot;
    const button = shadowRoot?.querySelector("button");

    expect(button?.classList.contains("large")).toBe(true);
    expect(button?.classList.contains("medium")).toBe(false);
  });

  it("should have disabled attribute when disabled", () => {
    buttonElement.setAttribute("disabled", "");

    const shadowRoot = buttonElement.shadowRoot;
    const button = shadowRoot?.querySelector("button");

    expect(button?.hasAttribute("disabled")).toBe(true);
  });

  it("should dispatch click event when not disabled", () => {
    let clicked = false;
    buttonElement.addEventListener("click", () => {
      clicked = true;
    });

    const shadowRoot = buttonElement.shadowRoot;
    const button = shadowRoot?.querySelector("button");

    button?.click();
    expect(clicked).toBe(true);
  });

  it("should not dispatch click event when disabled", () => {
    buttonElement.setAttribute("disabled", "");

    let clicked = false;
    buttonElement.addEventListener("click", () => {
      clicked = true;
    });

    const shadowRoot = buttonElement.shadowRoot;
    const button = shadowRoot?.querySelector("button");

    button?.click();
    expect(clicked).toBe(false);
  });

  it("should test all variants", () => {
    const variants = ["primary", "secondary", "danger", "success"];

    for (const variant of variants) {
      buttonElement.setAttribute("variant", variant);
      const button = buttonElement.shadowRoot?.querySelector("button");

      expect(button?.classList.contains(variant)).toBe(true);
      // Check that only one variant class is applied
      const otherVariants = variants.filter((v) => v !== variant);
      for (const otherVariant of otherVariants) {
        expect(button?.classList.contains(otherVariant)).toBe(false);
      }
    }
  });

  it("should test all sizes", () => {
    const sizes = ["small", "medium", "large"];

    for (const size of sizes) {
      buttonElement.setAttribute("size", size);
      const button = buttonElement.shadowRoot?.querySelector("button");

      expect(button?.classList.contains(size)).toBe(true);
      // Check that only one size class is applied
      const otherSizes = sizes.filter((s) => s !== size);
      for (const otherSize of otherSizes) {
        expect(button?.classList.contains(otherSize)).toBe(false);
      }
    }
  });

  it("should use property getters correctly", () => {
    const myButton = buttonElement as any;

    // Test default values
    expect(myButton.variant).toBe("primary");
    expect(myButton.size).toBe("medium");
    expect(myButton.disabled).toBe(false);
  });

  it("should use property setters correctly", () => {
    const myButton = buttonElement as any;

    // Test setting values via properties
    myButton.variant = "danger";
    expect(myButton.getAttribute("variant")).toBe("danger");

    myButton.size = "large";
    expect(myButton.getAttribute("size")).toBe("large");

    myButton.disabled = true;
    expect(myButton.hasAttribute("disabled")).toBe(true);

    // Test reflection in shadow DOM
    const button = myButton.shadowRoot?.querySelector("button");
    expect(button?.classList.contains("danger")).toBe(true);
    expect(button?.classList.contains("large")).toBe(true);
    expect(button?.hasAttribute("disabled")).toBe(true);
  });

  it("should remove disabled attribute when disabled property is set to false", () => {
    const myButton = buttonElement as any;

    // First, set disabled to true
    myButton.disabled = true;
    expect(myButton.hasAttribute("disabled")).toBe(true);

    // Then set it to false
    myButton.disabled = false;
    expect(myButton.hasAttribute("disabled")).toBe(false);

    // Check shadow DOM
    const button = myButton.shadowRoot?.querySelector("button");
    expect(button?.hasAttribute("disabled")).toBe(false);
  });

  it("should have bubbling and composed click events", () => {
    // Setup a container to test bubbling
    const container = document.createElement("div");
    document.body.appendChild(container);
    container.appendChild(buttonElement);

    // Setup listeners at different levels
    const eventDetails = {
      button: false,
      container: false,
      document: false,
    };

    buttonElement.addEventListener("click", (e) => {
      eventDetails.button = true;
      // Check if the event is composed
      expect(e.composed).toBe(true);
    });

    container.addEventListener("click", () => {
      eventDetails.container = true;
    });

    document.addEventListener("click", () => {
      eventDetails.document = true;
    });

    // Trigger the click
    const button = buttonElement.shadowRoot?.querySelector("button");
    button?.click();

    // Check that the event bubbled correctly
    expect(eventDetails.button).toBe(true);
    expect(eventDetails.container).toBe(true);
    expect(eventDetails.document).toBe(true);
  });

  it("should handle invalid variant value gracefully", () => {
    buttonElement.setAttribute("variant", "invalidVariant");

    // The invalid variant should still be applied as a class
    const button = buttonElement.shadowRoot?.querySelector("button");
    expect(button?.classList.contains("invalidVariant")).toBe(true);
  });

  it("should handle invalid size value gracefully", () => {
    buttonElement.setAttribute("size", "invalidSize");

    // The invalid size should still be applied as a class
    const button = buttonElement.shadowRoot?.querySelector("button");
    expect(button?.classList.contains("invalidSize")).toBe(true);
  });
});
