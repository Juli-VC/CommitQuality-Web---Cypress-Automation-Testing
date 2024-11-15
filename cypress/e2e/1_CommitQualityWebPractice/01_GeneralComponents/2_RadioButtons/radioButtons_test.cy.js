/// <reference types="cypress" />
///

describe("Radio buttons Click", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-general-components");
    cy.url().should("include", "general-components");
    cy.get(".radio-buttons-container p").should("not.exist");
  });

  it("First Radio-button, check", () => {
    cy.get('[data-testid="option1"]').should("not.be.checked").check("option1");
    cy.get(".radio-buttons-container p").should("have.text", "option1 clicked");
    //Test if radio button still checked.
    cy.get('[data-testid="option1"]').should("be.visible").and("be.checked");
  });
  it("Second Radio-button, check", () => {
    cy.get('[data-testid="option2"]').should("not.be.checked").check("option2");
    cy.get(".radio-buttons-container p").should("have.text", "option2 clicked");
    //Test if radio button still checked.
    cy.get('[data-testid="option2"]').should("be.visible").and("be.checked");
  });
  it("Click First radio button, check, click the second, message change to second", () => {
    //Clicking First radio Button
    cy.get('[data-testid="option1"]')
      .should("not.be.checked")
      .check("option1")
      .and("be.checked");
    cy.get(".radio-buttons-container p").should("have.text", "option1 clicked");
    //clicking SECOND radio button. Message must change.
    cy.get('[data-testid="option2"]')
      .should("not.be.checked")
      .check("option2")
      .and("be.checked");

    cy.get(".radio-buttons-container p").should("have.text", "option2 clicked");
    cy.get('[data-testid="option1"]')
      .should("be.visible")
      .and("not.be.checked");
  });
  it("Click Second radio button, check, click the first, message change to first", () => {
    //Clicking First radio Button
    cy.get('[data-testid="option2"]')
      .should("be.visible")
      .and("not.be.checked")
      .check("option2")
      .and("be.checked");
    cy.get(".radio-buttons-container p").should("have.text", "option2 clicked");
    //clicking FIRST radio button. Message must change.
    cy.get('[data-testid="option1"]')
      .should("be.visible")
      .and("not.be.checked")
      .check("option1")
      .and("be.checked");
    cy.get(".radio-buttons-container p").should("have.text", "option1 clicked");
    cy.get('[data-testid="option2"]')
      .should("be.visible")
      .and("not.be.checked");
  });
});
