/// <reference types="cypress" />
///
describe(" ", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-random-popup");
  });
  //
  it("Popup Functionality. Must close the modal", () => {
    //
    cy.get(".overlay", { timeout: 10000 })
      .should("be.visible")
      .find(".overlay-content")
      .within(() => {
        cy.get("p").should("be.visible").and("have.text", "Random Popup");
        cy.get("button").and("have.text", "Close");
      });
    cy.get(".overlay-content button").should("be.visible").click();
    //Only 4 elements present (link and 3 buttons).**Weak middle "div" with no ids/classes.**
    cy.get(".container div")
      .should("be.visible")
      .children()
      .should("have.length", 4);
    //.overlay (modal) should not exist.
    cy.wait(10000); //just in case modal opens agains. Must remain hidden.
    cy.get(".overlay").and("not.exist");
  });
});
