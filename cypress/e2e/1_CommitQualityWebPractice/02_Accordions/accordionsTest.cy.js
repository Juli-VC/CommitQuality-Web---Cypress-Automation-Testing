/// <reference types="cypress" />
///
describe("Accordions functionality ", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-accordions");
  });
  //
  it("Accordion 1. Must open. Have 3 buttons inside. Click me, double, right click. ", () => {
    //
    cy.contains('[data-testid="accordion-1"]', "Accordion 1")
      .should("be.visible")
      .and("not.be.disabled")
      .click()
      .next()
      .find("button")
      .should("be.visible")
      .and("have.length", 3);
  });
  it("Accordion 2. Must open. Have 2 radio button. ", () => {
    //
    cy.contains('[data-testid="accordion-1"]', "Accordion 2")
      .should("be.visible")
      .and("not.be.disabled")
      .click()
      .next()
      .find("div")
      .should("be.visible")
      .and("have.length", 2);
    //
    cy.contains(".radio-button-container", "Radio button")
      .should("be.visible")
      .within(() => {
        cy.get("input")
          .should("be.visible")
          .and("have.value", "option1")
          .and("have.attr", "data-testid", "option1")
          .and("have.attr", "name", "option")
          .and("have.attr", "type", "radio")
          .and("not.be.checked");
        cy.get("label").should("be.visible").and("have.text", "Radio button");
      });
    //
    cy.contains(".radio-container", "Radio button 2")
      .should("be.visible")
      .within(() => {
        cy.get("input")
          .should("be.visible")
          .and("have.value", "option2")
          .and("have.attr", "data-testid", "option2")
          .and("have.attr", "name", "option")
          .and("have.attr", "type", "radio")
          .and("not.be.checked");
        cy.get("label").should("be.visible").and("have.text", "Radio button 2");
      });
    //Radio button functionality--> see General components.
  });
  it("Accordion 3. Must open. Have 3 checkboxes. ", () => {
    //
    cy.contains('[data-testid="accordion-1"]', "Accordion 3")
      .should("be.visible")
      .and("not.be.disabled")
      .click()
      .next()
      .find(".checkbox-container")
      .should("be.visible")
      .and("have.length", 3);
    //
    //Checkboxes functionality--> see General components.
  });
  it("Click 3 accordions. Three must stay open. ", () => {
    //
    cy.contains('[data-testid="accordion-1"]', "Accordion 1")
      .click()
      .next()
      .find("button")
      .should("be.visible")
      .and("have.length", 3);
    cy.contains('[data-testid="accordion-1"]', "Accordion 2")
      .click()
      .next()
      .find("div")
      .should("be.visible")
      .and("have.length", 2);
    cy.contains('[data-testid="accordion-1"]', "Accordion 3")
      .click()
      .next()
      .find(".checkbox-container")
      .should("be.visible")
      .and("have.length", 3);
  });
  it("Click/close 3 accordions. Three must stay open. The three must close ", () => {
    //open
    cy.contains('[data-testid="accordion-1"]', "Accordion 1")
      .click()
      .next()
      .find("button")
      .should("be.visible")
      .and("have.length", 3);
    cy.contains('[data-testid="accordion-1"]', "Accordion 2")
      .click()
      .next()
      .find("div")
      .should("be.visible")
      .and("have.length", 2);
    cy.contains('[data-testid="accordion-1"]', "Accordion 3")
      .click()
      .next()
      .find(".checkbox-container")
      .should("be.visible")
      .and("have.length", 3);
    //closed
    cy.contains('[data-testid="accordion-1"]', "Accordion 1").click();
    cy.contains('[data-testid="accordion-1"]', "Accordion 2").click();
    cy.contains('[data-testid="accordion-1"]', "Accordion 3").click();
    //Only 4 elements present (link and 3 buttons).**Weak middle "div" with no ids/classes.**
    cy.get(".container div")
      .should("be.visible")
      .children()
      .should("have.length", 4);
  });
});
