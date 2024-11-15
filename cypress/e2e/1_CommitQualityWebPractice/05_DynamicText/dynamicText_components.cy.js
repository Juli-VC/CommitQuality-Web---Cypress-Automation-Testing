/// <reference types="cypress" />
///
describe("Dynamic default pre-test ", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-dyanmic-text");
    cy.url().should("include", "dyanmic");
  });
  //
  it("Default structure, state, values Dunamic text", () => {
    //
    cy.get(".component-container")
      .should("be.visible")
      .within(() => {
        cy.contains("h2", "Dynamic Text").should("be.visible");
        cy.get(".dynamic-data-container").should("be.visible");
      });
    cy.get(".dynamic-data-container")
      .should("be.visible")
      .within(() => {
        cy.get("h2").should("be.visible").and("include.text", "Dynamic fields");
        cy.get("button")
          .should("be.visible")
          .and("have.text", "Always visible")
          .and("not.be.disabled");
      });
    // not contains the dynamic text: loading on button & i am invisible 5 seconds
    cy.contains("loading").should("not.exist");
    cy.contains("I am visible after 5 seconds").should("not.exist");
  });
});
