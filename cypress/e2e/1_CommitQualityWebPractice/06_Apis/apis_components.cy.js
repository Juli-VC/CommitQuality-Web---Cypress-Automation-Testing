/// <reference types="cypress" />
///
describe("", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-api");
    cy.url().should("include", "api");
  });
  //
  it("Api default structure, state, values...", () => {
    //
    cy.get(".component-container").should("be.visible");
    cy.get(".component-container h2")
      .should("be.visible")
      .and("have.text", "API calls");
    cy.get(".component-container .api-container")
      .should("be.visible")
      .and("have.length", 1);
    cy.get(".api-container button")
      .should("be.visible")
      .and("have.text", "Make API Request(GET)")
      .and("have.attr", "data-testid", "get-button");
    // Should NOT exist pre-state.
    cy.get(".api-container p").should("not.exist");
    cy.get(".api-container pre").should("not.exist");
    cy.contains("Status code").should("not.exist");
  });
});
