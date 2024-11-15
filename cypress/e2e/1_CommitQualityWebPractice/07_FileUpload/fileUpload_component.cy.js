/// <reference types="cypress" />
///
const button_fontColor = "rgb(255, 255, 255)"; //white;
const button_backGroundColor = "rgb(51, 51, 51)"; //dark-grey;
//
describe("Fileupload default structure, values", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-file-upload");
    cy.url().should("include", "file-upload");
  });
  //
  it("Fileupload component structure, pre-state,...", () => {
    //
    cy.get(".file-upload")
      .should("be.visible")
      .find("form")
      .should("be.visible");
    cy.get(".file-upload form").within(() => {
      cy.get("label")
        .should("be.visible")
        .and("have.attr", "data-testid", "file-input-label")
        .and("have.attr", "for", "file-input")
        .and("have.text", "Choose a file:");
      cy.get("input")
        .should("be.visible")
        .and("have.attr", "id", "file-input")
        .and("have.attr", "data-testid", "file-input")
        .and("have.attr", "type", "file");
      cy.get("button")
        .should("be.visible")
        .and("have.attr", "type", "submit")
        .and("have.text", "Submit")
        .and("have.css", "color", button_fontColor)
        .and("have.css", "background-color", button_backGroundColor);
    });
    // Error div not exist
    cy.get(".error-message").should("not.exist");
  });
});
