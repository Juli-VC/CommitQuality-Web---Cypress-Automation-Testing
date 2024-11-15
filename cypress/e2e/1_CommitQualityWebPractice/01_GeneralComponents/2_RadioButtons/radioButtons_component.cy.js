/// <reference types="cypress" />
///

describe("Radio component tests", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-general-components");
    cy.url().should("include", "general-components");
    cy.get(".radio-buttons-container p").should("not.exist");
  });

  it("Radio-buttons component should contain the correct structure", () => {
    // Container has tittle
    cy.get(".radio-buttons-container")
      .find("h2")
      .should("be.visible")
      .and("have.text", " Radio buttons"); // space at beggining
    // radio buttons has 2 inputs
    cy.get(".radio-buttons-container")
      .find('input[type="radio"]')
      .should("be.visible")
      .should("have.length", 2);

    // Verify each inner components, have input radio and label.
    cy.get('.radio-button-container [data-testid="option1"]')
      .should("be.visible")
      .and("have.attr", "name", "option")
      .and("have.attr", "type", "radio")
      .and("have.value", "option1")
      .and("not.be.checked");
    cy.get('.radio-container [data-testid="option2"]')
      .should("be.visible")
      .and("have.attr", "name", "option")
      .and("have.attr", "type", "radio")
      .and("have.value", "option2")
      .and("not.be.checked");

    cy.get(".radio-button-container label")
      .should("be.visible")
      .and("have.text", "Radio button");
    cy.get(".radio-container label")
      .should("be.visible")
      .and("have.text", "Radio button 2");
  });
});
