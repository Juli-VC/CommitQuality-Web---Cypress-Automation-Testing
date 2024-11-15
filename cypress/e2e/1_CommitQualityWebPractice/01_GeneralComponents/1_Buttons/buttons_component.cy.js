/// <reference types="cypress" />
///

describe("Buttons component tests", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-general-components");
    cy.url().should("include", "general-components");
    //No clicked messages
    cy.get(".button-container p").should("not.exist");
  });
  it("Buttons component should contain the correct structure ", () => {
    // Container has tittle
    cy.get(".buttons-container")
      .find("h2")
      .should("be.visible")
      .and("have.text", " Buttons"); // space at beggining
    // Container has 3 inner buttons
    cy.get(".button-container")
      .find("button")
      .should("be.visible")
      .should("have.length", 3);

    // Verify each "buttons" inner element.
    cy.get('.button-container [data-testid="basic-click"]')
      .should("have.text", "Click me")
      .and("not.be.disabled");
    cy.get('.button-container [data-testid="double-click"]')
      .should("have.text", "Double click me")
      .and("not.be.disabled");
    cy.get('.button-container [data-testid="right-click"]')
      .should("contain", "Right click me")
      .and("not.be.disabled");
  });
});
