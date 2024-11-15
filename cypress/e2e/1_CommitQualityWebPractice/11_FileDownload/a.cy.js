/// <reference types="cypress" />
///
describe("File download component default", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-file-download");
    cy.url().should("include", "file-download");
  });
  //
  it("File download default structure", () => {
    //
    cy.get(".container").find("button").should("contain", "Download File");
  });
});
