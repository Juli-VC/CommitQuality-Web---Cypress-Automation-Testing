/// <reference types="cypress" />
///

describe("Select component tests", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-general-components");
    cy.url().should("include", "general-components");
  });
  it("Select component Default structure, state, values, ... Test", () => {
    // Container has title and select.
    cy.get(".dropdown-container").should("be.visible");
    cy.get(".dropdown-container")
      .find("h2")
      .should("be.visible")
      .and("have.text", " Select an option"); // space at beggining
    cy.get(".dropdown-container")
      .find("select")
      .should("be.visible")
      .and("have.length", 1);
    //Has a "Select element" and not be selected
    cy.get('[data-testid="dropdown"] select')
      .should("be.visible")
      .and("not.be.disabled")
      .and("not.be.selected")
      .and("have.value", "");

    //Has the default visible option
    cy.get('[data-testid="dropdown"] select > option:selected')
      .should("be.selected")
      .should("have.text", "Select an option");
  });
});
