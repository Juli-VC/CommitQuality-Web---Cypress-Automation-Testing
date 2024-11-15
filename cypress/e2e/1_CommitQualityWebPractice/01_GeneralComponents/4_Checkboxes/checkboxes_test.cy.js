/// <reference types="cypress" />
///

describe("Checkboxes functionality tests", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-general-components");
    cy.url().should("include", "general-components");
  });

  //Check options individually
  it("Check1 and unchecked", () => {
    //checking
    cy.get('[data-testid="checkbox1"]')
      .and("not.be.checked")
      .check()
      .and("be.checked");
    cy.get(".checkbox-container.container-outline p").should(
      "have.text",
      "Checkbox 1 checked"
    );
    //unchecking
    cy.get('[data-testid="checkbox1"]').and("be.checked").uncheck();
    cy.get(".checkbox-container.container-outline p").should("not.exist");
  });
  it("Check2 and unchecked", () => {
    //checking
    cy.get('[data-testid="checkbox2"]').and("not.be.checked").check();
    cy.get("div.checkbox-container.container-outline p").should(
      "have.text",
      "Checkbox 2 checked"
    );
    //unchecking
    cy.get('[data-testid="checkbox2"]').and("be.checked").uncheck();
    cy.get("div.checkbox-container.container-outline p").should("not.exist");
  });
  it("Check3 and unchecked", () => {
    //checking
    cy.get('[data-testid="checkbox3"]').and("not.be.checked").check();
    cy.get("div.checkbox-container.container-outline p").should(
      "have.text",
      "Checkbox 3 checked"
    );
    //unchecking
    cy.get('[data-testid="checkbox3"]').and("be.checked").uncheck();
    cy.get("div.checkbox-container.container-outline p").should("not.exist");
  });
  //check options and check next
  it("Check all", () => {
    //check 1
    cy.get('[data-testid="checkbox1"]')
      .and("not.be.checked")
      .check()
      .closest(".checkbox-container")
      .find("p")
      .should("have.text", "Checkbox 1 checked");
    //check 2
    cy.get('[data-testid="checkbox2"]')
      .and("not.be.checked")
      .check()
      .closest(".checkbox-container")
      .find("p")
      .should("have.text", "Checkbox 2 checked");
    //check 3
    cy.get('[data-testid="checkbox3"]')
      .and("not.be.checked")
      .check()
      .closest(".checkbox-container")
      .find("p")
      .should("have.text", "Checkbox 3 checked");
    cy.contains(".checkbox-container", "Checkbox 3")
      .find("p")
      .should("have.text", "Checkbox 3 checked");

    //Test if ALL are Checked!
    cy.get(
      '[data-testid="checkbox1"], [data-testid="checkbox2"],[data-testid="checkbox3"]'
    ).should("be.checked");
  });
  //UnCheck one be one and test if all are unchecked
  it("UNCHECK ALL", () => {
    //check all previusly
    cy.get(
      '[data-testid="checkbox1"], [data-testid="checkbox2"],[data-testid="checkbox3"]'
    )
      .check()
      .should("be.checked");
    //uncheck 1
    cy.get('[data-testid="checkbox1"]')
      .and("be.checked")
      .uncheck()
      .closest(".checkbox-container")
      .find("p")
      .should("not.exist");
    //uncheck 2
    cy.get('[data-testid="checkbox2"]')
      .and("be.checked")
      .uncheck()
      .closest(".checkbox-container")
      .find("p")
      .should("not.exist");
    //uncheck 3
    cy.get('[data-testid="checkbox3"]')
      .and("be.checked")
      .uncheck()
      .closest(".checkbox-container")
      .find("p")
      .should("not.exist");

    //Test if ALL are unchecked!
    cy.get(
      '[data-testid="checkbox1"], [data-testid="checkbox2"],[data-testid="checkbox3"]'
    ).should("not.be.checked");

    cy.get(".checkbox-container").find("p").should("not.exist");
  });
});
