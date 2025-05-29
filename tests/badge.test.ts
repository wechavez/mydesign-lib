import { describe, it, expect, beforeEach } from "vitest";
import "../src/components/badge/badge";

describe("MyBadge Component", () => {
  let badgeElement: HTMLElement;

  beforeEach(() => {
    // Create a new badge element before each test
    document.body.innerHTML = "";
    badgeElement = document.createElement("my-badge");
    badgeElement.textContent = "Badge Text";
    document.body.appendChild(badgeElement);
  });

  it("should render with default properties", () => {
    const shadowRoot = badgeElement.shadowRoot;
    const badge = shadowRoot?.querySelector(".badge");

    expect(badge).not.toBeNull();
    expect(badge?.classList.contains("filled")).toBe(true);
    expect(badge?.classList.contains("primary")).toBe(true);
    expect(badge?.classList.contains("medium")).toBe(true);
    expect(badgeElement.textContent).toBe("Badge Text");
  });

  it("should change variant when attribute is set", () => {
    badgeElement.setAttribute("variant", "outlined");

    const shadowRoot = badgeElement.shadowRoot;
    const badge = shadowRoot?.querySelector(".badge");

    expect(badge?.classList.contains("outlined")).toBe(true);
    expect(badge?.classList.contains("filled")).toBe(false);
  });

  it("should change color when attribute is set", () => {
    badgeElement.setAttribute("color", "success");

    const shadowRoot = badgeElement.shadowRoot;
    const badge = shadowRoot?.querySelector(".badge");

    expect(badge?.classList.contains("success")).toBe(true);
    expect(badge?.classList.contains("primary")).toBe(false);
  });

  it("should change size when attribute is set", () => {
    badgeElement.setAttribute("size", "large");

    const shadowRoot = badgeElement.shadowRoot;
    const badge = shadowRoot?.querySelector(".badge");

    expect(badge?.classList.contains("large")).toBe(true);
    expect(badge?.classList.contains("medium")).toBe(false);
  });

  it("should test all variants", () => {
    const variants = ["filled", "outlined", "soft"];

    for (const variant of variants) {
      badgeElement.setAttribute("variant", variant);
      const badge = badgeElement.shadowRoot?.querySelector(".badge");

      expect(badge?.classList.contains(variant)).toBe(true);
      // Check that only one variant class is applied
      const otherVariants = variants.filter((v) => v !== variant);
      for (const otherVariant of otherVariants) {
        expect(badge?.classList.contains(otherVariant)).toBe(false);
      }
    }
  });

  it("should test all colors", () => {
    const colors = ["primary", "secondary", "success", "warning", "danger", "info", "neutral"];

    for (const color of colors) {
      badgeElement.setAttribute("color", color);
      const badge = badgeElement.shadowRoot?.querySelector(".badge");

      expect(badge?.classList.contains(color)).toBe(true);
      // Check that only one color class is applied
      const otherColors = colors.filter((c) => c !== color);
      for (const otherColor of otherColors) {
        expect(badge?.classList.contains(otherColor)).toBe(false);
      }
    }
  });

  it("should test all sizes", () => {
    const sizes = ["small", "medium", "large"];

    for (const size of sizes) {
      badgeElement.setAttribute("size", size);
      const badge = badgeElement.shadowRoot?.querySelector(".badge");

      expect(badge?.classList.contains(size)).toBe(true);
      // Check that only one size class is applied
      const otherSizes = sizes.filter((s) => s !== size);
      for (const otherSize of otherSizes) {
        expect(badge?.classList.contains(otherSize)).toBe(false);
      }
    }
  });

  it("should use property getters correctly", () => {
    const myBadge = badgeElement as any;

    // Test default values
    expect(myBadge.variant).toBe("filled");
    expect(myBadge.color).toBe("primary");
    expect(myBadge.size).toBe("medium");
  });

  it("should use property setters correctly", () => {
    const myBadge = badgeElement as any;

    // Test setting values via properties
    myBadge.variant = "soft";
    expect(myBadge.getAttribute("variant")).toBe("soft");

    myBadge.color = "danger";
    expect(myBadge.getAttribute("color")).toBe("danger");

    myBadge.size = "large";
    expect(myBadge.getAttribute("size")).toBe("large");

    // Test reflection in shadow DOM
    const badge = myBadge.shadowRoot?.querySelector(".badge");
    expect(badge?.classList.contains("soft")).toBe(true);
    expect(badge?.classList.contains("danger")).toBe(true);
    expect(badge?.classList.contains("large")).toBe(true);
  });

  it("should handle invalid variant value gracefully", () => {
    badgeElement.setAttribute("variant", "invalidVariant");
    
    const badge = badgeElement.shadowRoot?.querySelector(".badge");
    // Should still render, just with the invalid class
    expect(badge).not.toBeNull();
    expect(badge?.classList.contains("invalidVariant")).toBe(true);
  });

  it("should handle invalid color value gracefully", () => {
    badgeElement.setAttribute("color", "invalidColor");
    
    const badge = badgeElement.shadowRoot?.querySelector(".badge");
    // Should still render, just with the invalid class
    expect(badge).not.toBeNull();
    expect(badge?.classList.contains("invalidColor")).toBe(true);
  });

  it("should handle invalid size value gracefully", () => {
    badgeElement.setAttribute("size", "invalidSize");
    
    const badge = badgeElement.shadowRoot?.querySelector(".badge");
    // Should still render, just with the invalid class
    expect(badge).not.toBeNull();
    expect(badge?.classList.contains("invalidSize")).toBe(true);
  });

  it("should re-render when attributes change", () => {
    const myBadge = badgeElement as any;
    
    // Initial state
    let badge = myBadge.shadowRoot?.querySelector(".badge");
    expect(badge?.classList.contains("filled")).toBe(true);
    expect(badge?.classList.contains("primary")).toBe(true);
    expect(badge?.classList.contains("medium")).toBe(true);

    // Change multiple attributes
    badgeElement.setAttribute("variant", "outlined");
    badgeElement.setAttribute("color", "success");
    badgeElement.setAttribute("size", "small");

    // Check updated state
    badge = myBadge.shadowRoot?.querySelector(".badge");
    expect(badge?.classList.contains("outlined")).toBe(true);
    expect(badge?.classList.contains("success")).toBe(true);
    expect(badge?.classList.contains("small")).toBe(true);
    expect(badge?.classList.contains("filled")).toBe(false);
    expect(badge?.classList.contains("primary")).toBe(false);
    expect(badge?.classList.contains("medium")).toBe(false);
  });

  it("should contain slot for content", () => {
    const shadowRoot = badgeElement.shadowRoot;
    const slot = shadowRoot?.querySelector("slot");

    expect(slot).not.toBeNull();
  });

  it("should display slotted content correctly", () => {
    // Clear and set new content
    badgeElement.innerHTML = "New Content";
    
    // The content should be accessible through the element's textContent
    expect(badgeElement.textContent).toBe("New Content");
  });

  it("should have proper CSS classes structure", () => {
    const shadowRoot = badgeElement.shadowRoot;
    const badge = shadowRoot?.querySelector(".badge");

    // Should have exactly 3 classes by default (variant, color, size) + "badge"
    expect(badge?.className.split(" ").length).toBe(4);
    expect(badge?.className).toContain("filled");
    expect(badge?.className).toContain("primary");
    expect(badge?.className).toContain("medium");
  });

  it("should be defined as custom element", () => {
    expect(customElements.get("my-badge")).toBeDefined();
  });

  it("should have shadow DOM attached", () => {
    expect(badgeElement.shadowRoot).not.toBeNull();
    expect(badgeElement.shadowRoot?.mode).toBe("open");
  });

  it("should have correct observedAttributes", () => {
    const MyBadgeClass = customElements.get("my-badge") as any;
    const observedAttributes = MyBadgeClass.observedAttributes;
    
    expect(observedAttributes).toContain("variant");
    expect(observedAttributes).toContain("color");
    expect(observedAttributes).toContain("size");
    expect(observedAttributes.length).toBe(3);
  });

  it("should test combination of all properties", () => {
    const variants = ["filled", "outlined", "soft"];
    const colors = ["primary", "secondary", "success"];
    const sizes = ["small", "medium", "large"];

    // Test a few combinations to ensure they work together
    for (const variant of variants) {
      for (const color of colors) {
        for (const size of sizes) {
          badgeElement.setAttribute("variant", variant);
          badgeElement.setAttribute("color", color);
          badgeElement.setAttribute("size", size);

          const badge = badgeElement.shadowRoot?.querySelector(".badge");
          expect(badge?.classList.contains(variant)).toBe(true);
          expect(badge?.classList.contains(color)).toBe(true);
          expect(badge?.classList.contains(size)).toBe(true);
        }
      }
    }
  });

  it("should maintain content when attributes change", () => {
    badgeElement.textContent = "Persistent Content";
    
    // Change attributes
    badgeElement.setAttribute("variant", "soft");
    badgeElement.setAttribute("color", "warning");
    badgeElement.setAttribute("size", "large");
    
    // Content should remain
    expect(badgeElement.textContent).toBe("Persistent Content");
  });

  it("should have proper semantic HTML structure", () => {
    const shadowRoot = badgeElement.shadowRoot;
    const span = shadowRoot?.querySelector("span.badge");
    const slot = span?.querySelector("slot");

    expect(span).not.toBeNull();
    expect(span?.tagName.toLowerCase()).toBe("span");
    expect(slot).not.toBeNull();
  });

  it("should handle empty content gracefully", () => {
    badgeElement.textContent = "";
    
    const shadowRoot = badgeElement.shadowRoot;
    const badge = shadowRoot?.querySelector(".badge");
    
    expect(badge).not.toBeNull();
    expect(badgeElement.textContent).toBe("");
  });

  it("should handle numeric content", () => {
    badgeElement.textContent = "42";
    
    expect(badgeElement.textContent).toBe("42");
    
    const shadowRoot = badgeElement.shadowRoot;
    const badge = shadowRoot?.querySelector(".badge");
    expect(badge).not.toBeNull();
  });

  it("should handle special characters in content", () => {
    const specialContent = "@ # $ % & *";
    badgeElement.textContent = specialContent;
    
    expect(badgeElement.textContent).toBe(specialContent);
  });
}); 