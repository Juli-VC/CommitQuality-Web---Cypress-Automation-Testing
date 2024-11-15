/// <reference types="cypress" />
///
describe("Login page components default structure test", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/login");
    cy.url().should("include", "login");
    cy.title().should("include", "CommitQuality - Test Automation Demo");
    // Error message should NOT exist
    cy.get(".error").should("not.exist");
  });
  //
  it("Login component structure", () => {
    // Title Login
    cy.get(".container").should("be.visible").contains("Login");
    // Form exist and is visible
    cy.get(".container form").should("be.visible");
    // Form components
    cy.contains("form div", "Username:")
      .should("be.visible")
      .within(() => {
        cy.get("input")
          .should("be.visible")
          .and("have.attr", "data-testid", "username-textbox")
          .and("have.attr", "placeholder", "Enter Username")
          .and("have.value", "");
        cy.get("label").should("be.visible").and("have.text", "Username:");
      });
    cy.contains("form div", "Password:")
      .should("be.visible")
      .within(() => {
        cy.get("input")
          .should("be.visible")
          .and("have.attr", "data-testid", "password-textbox")
          .and("have.attr", "placeholder", "Enter Password")
          .and("have.value", "");
        cy.get("label").should("be.visible").and("have.text", "Password:");
      });

    // LoginButton
    cy.get("form button")
      .and("have.attr", "data-testid", "login-button")
      .and("have.text", "Login")
      .and("have.css", "background-color", "rgb(51, 51, 51)");

    //TODO: hover/focus/click-mantain, button change. White backgroind, color balck, blue outline.
    // Needs external library.
  });
  ///////
});
