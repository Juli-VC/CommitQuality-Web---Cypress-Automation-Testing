/// <reference types="cypress" />
///
describe("Dynamic Text. Click button. Should 'loading', and change text ", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-dyanmic-text");
    cy.url().should("include", "dyanmic");
  });
  //
  it("Default structure, state, values Dunamic text", () => {
    //
    // not contains the dynamic text: loading on button & i am invisible 5 seconds
    cy.contains("loading").should("not.exist");
    cy.contains("I am visible after 5 seconds").should("not.exist");
    //Button default
    cy.get('[data-testid="dynamic-button1"')
      .should("be.visible")
      .and("have.text", "Always visible")
      .click()
      .should("have.text", "loading");
    // After 5 seconds, button text change.
    cy.wait(6000);
    cy.get('[data-testid="dynamic-button1"')
      .should("be.visible")
      .and("have.text", "I am visible after 5 seconds");
    // not contains the previues "Always visible"
    cy.contains("Always visible").should("not.exist");
  });
});
