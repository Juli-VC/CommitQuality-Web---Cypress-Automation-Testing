/// <reference types="cypress" />
///
describe("DragAndDrop functionality tests", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-drag-and-drop");
    cy.url().should("include", "drag-and-drop");
    // Should no exist text Success!
    cy.contains("Success!").should("not.exist");
  });
  //
  it("DragAndDrop success!", () => {
    // simulate drag event
    const dataTransfer = new DataTransfer();
    // dragstart event
    cy.get('[data-testid="small-box"]')
      .trigger("dragstart", { dataTransfer })
      .should("have.class", "dragging")
      .trigger("dragend", { dataTransfer })
      .should("not.have.class", "dragging");

    // Drop the small box into the large box
    cy.get('[data-testid="large-box"]')
      .trigger("drop", { dataTransfer })
      .trigger("dragover", { dataTransfer });

    // Verify that the action has completed. Message success!
    cy.get('[data-testid="large-box"]').should("contain.text", "Success!");
    cy.contains("Drag the small box here.").should("not.exist");
  });
});
