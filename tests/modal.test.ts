import { describe, it, expect, beforeEach, vi } from "vitest";
import "../src/components/modal/modal";

describe("MyModal Component", () => {
  let modalElement: HTMLElement;

  beforeEach(() => {
    // Create a new modal element before each test
    document.body.innerHTML = "";
    modalElement = document.createElement("my-modal");
    modalElement.innerHTML = `
      <div slot="header">Modal Title</div>
      <p>Modal content goes here</p>
      <div slot="footer">
        <button>Close</button>
      </div>
    `;
    document.body.appendChild(modalElement);
  });

  it("should render with default properties (closed by default)", () => {
    const shadowRoot = modalElement.shadowRoot;
    const backdrop = shadowRoot?.querySelector(".modal-backdrop");

    expect(backdrop).not.toBeNull();
    expect(backdrop?.classList.contains("open")).toBe(false);
    expect(modalElement.hasAttribute("open")).toBe(false);
  });

  it("should render slots correctly", () => {
    // Check that slots are properly set up
    expect(modalElement.querySelector('[slot="header"]')?.textContent).toBe(
      "Modal Title"
    );
    expect(modalElement.querySelector("p")?.textContent).toBe(
      "Modal content goes here"
    );
    expect(
      modalElement.querySelector('[slot="footer"] button')?.textContent
    ).toBe("Close");
  });

  it("should open when the open attribute is set", () => {
    modalElement.setAttribute("open", "");

    const shadowRoot = modalElement.shadowRoot;
    const backdrop = shadowRoot?.querySelector(".modal-backdrop");

    expect(backdrop?.classList.contains("open")).toBe(true);
    expect(modalElement.hasAttribute("open")).toBe(true);
  });

  it("should close when the close button is clicked", () => {
    // First open the modal
    modalElement.setAttribute("open", "");

    // Then click the close button
    const shadowRoot = modalElement.shadowRoot;
    const closeButton = shadowRoot?.querySelector(
      ".close-button"
    ) as HTMLElement;
    closeButton?.click();

    // Check if modal is now closed
    const backdrop = shadowRoot?.querySelector(".modal-backdrop");
    expect(backdrop?.classList.contains("open")).toBe(false);
    expect(modalElement.hasAttribute("open")).toBe(false);
  });

  it("should close when clicking outside the modal", () => {
    // First open the modal
    modalElement.setAttribute("open", "");

    // Then click on the backdrop (outside the modal)
    const shadowRoot = modalElement.shadowRoot;
    const backdrop = shadowRoot?.querySelector(
      ".modal-backdrop"
    ) as HTMLElement;

    // Create a click event that ensures the target is the backdrop
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperty(clickEvent, "target", { value: backdrop });
    backdrop?.dispatchEvent(clickEvent);

    const reRenderedBackdrop = shadowRoot?.querySelector(".modal-backdrop");

    // Check if modal is now closed
    expect(modalElement.hasAttribute("open")).toBe(false);
    expect(reRenderedBackdrop?.classList.contains("open")).toBe(false);
  });

  it("should not close when clicking inside the modal container", () => {
    // First open the modal
    modalElement.setAttribute("open", "");

    // Then click inside the modal container
    const shadowRoot = modalElement.shadowRoot;
    const modalContainer = shadowRoot?.querySelector(
      ".modal-container"
    ) as HTMLElement;

    // Create a click event on the backdrop, but with target as the container
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });

    const backdrop = shadowRoot?.querySelector(
      ".modal-backdrop"
    ) as HTMLElement;
    Object.defineProperty(clickEvent, "target", { value: modalContainer });
    backdrop?.dispatchEvent(clickEvent);

    const reRenderedBackdrop = shadowRoot?.querySelector(".modal-backdrop");

    // Check if modal remains open
    expect(reRenderedBackdrop?.classList.contains("open")).toBe(true);
    expect(modalElement.hasAttribute("open")).toBe(true);
  });

  it("should dispatch modal-state-change event when open state changes", () => {
    const stateChangeSpy = vi.fn();
    modalElement.addEventListener("modal-state-change", stateChangeSpy);

    // Change open state to true
    modalElement.setAttribute("open", "");
    expect(stateChangeSpy).toHaveBeenCalledTimes(1);
    expect(stateChangeSpy.mock.calls[0][0].detail.open).toBe(true);

    // Change open state to false
    modalElement.removeAttribute("open");
    expect(stateChangeSpy).toHaveBeenCalledTimes(2);
    expect(stateChangeSpy.mock.calls[1][0].detail.open).toBe(false);
  });

  it("should close when Escape key is pressed", () => {
    // First open the modal
    modalElement.setAttribute("open", "");

    // Simulate pressing the Escape key
    const escapeEvent = new KeyboardEvent("keydown", {
      key: "Escape",
      bubbles: true,
    });
    document.dispatchEvent(escapeEvent);

    // Check if modal is now closed
    const shadowRoot = modalElement.shadowRoot;
    const backdrop = shadowRoot?.querySelector(".modal-backdrop");
    expect(backdrop?.classList.contains("open")).toBe(false);
    expect(modalElement.hasAttribute("open")).toBe(false);
  });

  it("should not react to keys other than Escape", () => {
    // First open the modal
    modalElement.setAttribute("open", "");

    // Simulate pressing a key other than Escape
    const otherKeyEvent = new KeyboardEvent("keydown", {
      key: "Enter",
      bubbles: true,
    });
    document.dispatchEvent(otherKeyEvent);

    // Check if modal remains open
    const shadowRoot = modalElement.shadowRoot;
    const backdrop = shadowRoot?.querySelector(".modal-backdrop");
    expect(backdrop?.classList.contains("open")).toBe(true);
    expect(modalElement.hasAttribute("open")).toBe(true);
  });

  it("should remove event listeners when disconnected", () => {
    // Spy on document.removeEventListener
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

    // Remove the modal from the DOM
    document.body.removeChild(modalElement);

    // Check if the event listener was removed
    expect(removeEventListenerSpy).toHaveBeenCalled();
    expect(
      removeEventListenerSpy.mock.calls.some((call) => call[0] === "keydown")
    ).toBe(true);

    // Clean up spy
    removeEventListenerSpy.mockRestore();
  });
});
