/// <reference types="cypress" />
///
describe("LoginPage functionallity test", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/login");
    cy.url().should("include", "login");
    cy.title().should("include", "CommitQuality - Test Automation Demo");
    // Error message should NOT exist
    cy.get(".error").should("not.exist");
  });
  //
  it("Invalid login", () => {
    cy.get('[data-testid="username-textbox"]').type("john");
    cy.get('[data-testid="password-textbox"]').type("1234");
    cy.get('[data-testid="login-button"]').click();

    cy.get(".error")
      .should("be.visible")
      .and("have.text", "Invalid username or password");
  });
  it("Invalid (password). NOT (forget) type password", () => {
    cy.get('[data-testid="username-textbox"]').type("john");
    //cy.get('[data-testid="password-textbox"]').type("");
    cy.get('[data-testid="login-button"]').click();

    cy.get(".error")
      .should("be.visible")
      .and("have.text", "Please enter a username and password");
  });
  it("Invalid (username). NOT (forget) type name", () => {
    //cy.get('[data-testid="username-textbox"]').type("");
    cy.get('[data-testid="password-textbox"]').type("1234");
    cy.get('[data-testid="login-button"]').click();

    cy.get(".error")
      .should("be.visible")
      .and("have.text", "Please enter a username and password");
  });
  it("Error.Click submit WITHOUT filling inputs", () => {
    //cy.get('[data-testid="username-textbox"]').type("");
    //cy.get('[data-testid="password-textbox"]').type("");
    cy.get('[data-testid="login-button"]').click();

    cy.get(".error")
      .should("be.visible")
      .and("have.text", "Please enter a username and password");
  });
  ///////
});
