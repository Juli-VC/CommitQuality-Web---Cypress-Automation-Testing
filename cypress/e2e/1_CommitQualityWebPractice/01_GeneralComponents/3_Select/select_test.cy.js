/// <reference types="cypress" />
///

describe("Select functionality tests", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-general-components");
    cy.url().should("include", "general-components");
    //Has the default visible option
    cy.get('[data-testid="dropdown"] select > option:selected')
      .should("be.selected")
      .should("have.text", "Select an option");
  });
  it("Select option1", () => {
    //option1
    cy.get('[data-testid="dropdown"] select')
      .select("option1")
      .should("have.value", "option1");
    //Visible text option1
    cy.get('[data-testid="dropdown"] select option:selected')
      .invoke("text")
      .should("eq", "Option 1");
  });
  it("Select option2", () => {
    //option1
    cy.get('[data-testid="dropdown"] select')
      .select("option2")
      .should("have.value", "option2");
    //Visible text option1
    cy.get('[data-testid="dropdown"] select option:selected')
      .invoke("text")
      .should("eq", "Option 2");
  });
  it("Select option3", () => {
    //option1
    cy.get('[data-testid="dropdown"] select')
      .select("option3")
      .should("have.value", "option3");
    //Visible text option1
    cy.get('[data-testid="dropdown"] select option:selected')
      .invoke("text")
      .should("eq", "Option 3");
  });
  it("Select all options by description text", () => {
    //option1
    cy.get('[data-testid="dropdown"] select')
      .should("be.visible")
      .and("not.be.selected")
      .select("Option 1")
      .should("have.value", "option1");
    cy.get('[data-testid="dropdown"] select option:selected')
      .invoke("text")
      .should("eq", "Option 1");
    //option2
    cy.get('[data-testid="dropdown"] select')
      .should("be.visible")
      .select("Option 2")
      .should("have.value", "option2");
    cy.get('[data-testid="dropdown"] select option:selected')
      .invoke("text")
      .should("eq", "Option 2");
    //option3
    cy.get('[data-testid="dropdown"] select')
      .should("be.visible")
      .select("Option 3")
      .should("have.value", "option3"); //Visible text option1
    cy.get('[data-testid="dropdown"] select option:selected')
      .invoke("text")
      .should("eq", "Option 3");
    //optionDefault
    cy.get('[data-testid="dropdown"] select')
      .should("be.visible")
      .select("Option 3")
      .should("have.value", "option3"); //Visible text option1
    cy.get('[data-testid="dropdown"] select option:selected')
      .invoke("text")
      .should("eq", "Option 3");
  });
});
