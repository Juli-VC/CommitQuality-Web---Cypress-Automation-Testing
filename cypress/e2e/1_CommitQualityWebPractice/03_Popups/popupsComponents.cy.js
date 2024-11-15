/// <reference types="cypress" />
// Variable / imports
const a_linkColor = "rgb(0, 0, 255)"; //blue
const button_accordion_fontColor = "rgb(255, 255, 255)";
const button_accordion_backGroundColor = "rgb(51, 51, 51)";

describe("Default structure, settings, values of Accordions Components", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-random-popup");
    cy.url().should("include", "popup");
  });
  //
  it("Main body. Should have: back to practice and 3 buttons Accordions. And not have any opened. And a popup afeter a few seconds", () => {
    //Only 4 elements present (link and 3 buttons).**Weak middle "div" with no ids/classes.**
    cy.get(".container div")
      .should("be.visible")
      .children()
      .should("have.length", 4);

    //-- Link "a", back to practice with url.
    cy.get(".container a")
      .should("be.visible")
      .and("include.text", "back to practice")
      .and("have.css", "color", a_linkColor);
    // 3 Buttons Accordions
    ////-- Normal button
    cy.get("button")
      .should("be.visible")
      .and("have.class", "practice-button")
      .and("include.text", "Accordion")
      .and("have.length", 3)
      .and("have.css", "color", button_accordion_fontColor)
      .and("have.css", "background-color", button_accordion_backGroundColor);

    ////-- Accordion 1
    cy.contains("button", "Accordion 1")
      .should("be.visible")
      .and("have.attr", "data-testid", "accordion-1");
    ////-- Accordion 2
    cy.contains("button", "Accordion 2")
      .should("be.visible")
      .and("have.attr", "data-testid", "accordion-2");
    ////-- Accordion 3
    cy.contains("button", "Accordion 3")
      .should("be.visible")
      .and("have.attr", "data-testid", "accordion-3");
    // popup
    cy.get(".overlay", { timeout: 10000 })
      .should("be.visible")
      .find(".overlay-content")
      .within(() => {
        cy.get("p").should("be.visible").and("have.text", "Random Popup");
        cy.get("button").should("be.visible").and("have.text", "Close");
      });
  });
});
