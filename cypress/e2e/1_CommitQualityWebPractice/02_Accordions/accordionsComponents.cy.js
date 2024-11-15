/// <reference types="cypress" />
import "cypress-real-events";
//
// Variable / imports
const a_linkColor = "rgb(0, 0, 255)"; //blue
const button_accordion_fontColor = "rgb(255, 255, 255)"; //white;
const button_accordion_backGroundColor = "rgb(51, 51, 51)"; //dark-grey;
const button_hover_accordion_fontColor = "rgb(51, 51, 51)";
const button_hover_accordion_backGroundColor = "rgb(255, 255, 255)";

describe("Accordions Default structure, settings, values of Accordions Components", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-accordions");
    cy.url().should("include", "accordions");
  });
  //
  it("Main body. Should have: back to practice and 3 buttons Accordions. And not have any opened.", () => {
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
    ////-- Hover Button
    cy.contains("button", "Accordion")
      .realHover()
      .should("be.visible")
      .and("have.class", "practice-button")
      .and("include.text", "Accordion")
      .and("have.css", "color", button_hover_accordion_fontColor)
      .and(
        "have.css",
        "background-color",
        button_hover_accordion_backGroundColor
      );
    ////-- Accordion 1
    cy.contains("button", "Accordion 1")
      .should("be.visible")
      .and("have.attr", "data-testid", "accordion-1");
    ////-- Accordion 2
    cy.contains("button", "Accordion 2")
      .should("be.visible")
      .and("have.attr", "data-testid", "accordion-1");
    ////-- Accordion 3
    cy.contains("button", "Accordion 3")
      .should("be.visible")
      .and("have.attr", "data-testid", "accordion-1");
  });
});
