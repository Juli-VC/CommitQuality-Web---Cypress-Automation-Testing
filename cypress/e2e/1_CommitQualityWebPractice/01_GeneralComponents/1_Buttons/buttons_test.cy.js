/// <reference types="cypress" />
///

describe("Buttons functionality tests Click types", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-general-components");
    cy.url().should("include", "general-components");
    //No clicked messages
    cy.get(".button-container p").should("not.exist");
  });
  it("First button, Click me", () => {
    cy.get('[data-testid="basic-click"]')
      .and("include.text", "Click me")
      .click();
    cy.get(".button-container p")
      .should("have.text", "Button clicked")
      .and("be.visible");
    // Asure that its the only "p" in .buttons-container, and have that text.
    cy.get(".button-container")
      .find("p")
      .should("be.visible")
      .and("have.text", "Button clicked");
  });
  it("Second button, Double click", () => {
    cy.get('[data-testid="double-click"]')
      .should("have.text", "Double click me")
      .dblclick();
    cy.get(".button-container p")
      .should("have.text", "Button double clicked")
      .and("be.visible");
    // Asure that its the only "p" in .buttons-container, and have that text.
    cy.get(".button-container")
      .find("p")
      .should("be.visible")
      .and("have.text", "Button double clicked");
  });
  it("Third button, Right click", () => {
    cy.get('[data-testid="right-click"]').rightclick();
    cy.get(".buttons-container p")
      .should("have.text", "Button right mouse clicked")
      .and("be.visible");
    // Asure that its the only "p" in .buttons-container, and have that text.
    cy.get(".button-container")
      .find("p")
      .should("be.visible")
      .and("have.text", "Button right mouse clicked");
  });
  // Multiple buttons clicked. All 3.
  it("All buttons clicked. Should show 3 messages.", () => {
    cy.get('[data-testid="basic-click"]').click();
    cy.get('[data-testid="double-click"]').dblclick();
    cy.get('[data-testid="right-click"]').rightclick();

    cy.get(".buttons-container").find("p").should("have.length", 3);
  });
});
