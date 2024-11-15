/// <reference types="cypress" />
///
describe("Practice -CommitQuality-  functionality test. Each component should link and redirect to corresponing page/endpoint.", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice");
    cy.url().should("include", "practice");
    cy.title().should("include", "CommitQuality - Test Automation Demo");
  });
  //
  it("GeneralComponent page", () => {
    cy.get('[data-testid="practice-general"]').click();
    cy.url().should("include", "general-components");
  });
  it("Accordions page", () => {
    cy.get('[data-testid="practice-accordions"]').click();
    cy.url().should("include", "accordions");
  });
  it("Popups page", () => {
    cy.get('[data-testid="practice-random-overlay"]').click();
    cy.url().should("include", "random-popup");
  });
  it("Iframe page", () => {
    cy.get('[data-testid="practice-iframe"]').click();
    cy.url().should("include", "iframe");
  });
  it("Api page", () => {
    cy.get('[data-testid="practice-api"]').click();
    cy.url().should("include", "api");
  });
  it("DynamicText", () => {
    cy.get('[data-testid="practice-dynamic-text"]').click();
    cy.url().should("include", "dyanmic-text");
  });
  it("DrangAndDrop page", () => {
    cy.get('[data-testid="practice-drag-drop"]').click();
    cy.url().should("include", "drag-and-drop");
  });
  it("ContactUsForm page", () => {
    cy.get('[data-testid="practice-contact-form"]').click();
    cy.url().should("include", "contact-form");
  });
  it("MockDatalayer page", () => {
    cy.get('[data-testid="practice-mock-data-layer"]').click();
    cy.url().should("include", "mock-data-layer");
  });
  it("FileDownload page", () => {
    cy.get('[data-testid="practice-file-download"]').click();
    cy.url().should("include", "file-download");
  });
  it("TimeTesting page", () => {
    cy.get('[data-testid="practice-clock"]').click();
    cy.url().should("include", "clock");
  });
});
