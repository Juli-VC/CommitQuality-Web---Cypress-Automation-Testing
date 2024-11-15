/// <reference types="cypress" />
///
describe("DragAndDrop component default settings", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-drag-and-drop");
    cy.url().should("include", "drag-and-drop");
  });
  //
  it("DragAndDrop default structure, state, values...", () => {
    // Should no exist text Success!
    cy.contains("Success!").should("not.exist");
    //
    cy.get(".drag-and-drop").should("be.visible");
    cy.get(".drag-and-drop .small-box")
      .should("be.visible")
      .and("have.attr", "data-testid", "small-box")
      .and("have.attr", "id", "small-box")
      .and("have.attr", "draggable", "true")
      .and("have.text", "Drag me!");
    cy.get(".drag-and-drop .large-box")
      .should("be.visible")
      .and("have.attr", "data-testid", "large-box")
      .and("have.text", "Drag the small box here.");
  });
});
