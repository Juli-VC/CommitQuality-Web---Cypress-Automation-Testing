/// <reference types="cypress" />
///
describe("Practice page components default structure test", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice");
    cy.url().should("include", "practice");
    cy.title().should("include", "CommitQuality - Test Automation Demo");
  });
  //

  it("Headline text warning", () => {
    cy.get(".container p")
      .contains(
        "Note to user: This page is likely to be updated - Things may move around and extra items will be added."
      )
      .should("be.visible");
  });
  it("Practice page general structure", () => {
    cy.get(".container")
      .should("be.visible")
      .children()
      .children()
      .and("have.length", 13);
  });
  it("Component - GeneralComponents", () => {
    cy.get('[data-testid="practice-general"]').should("be.visible");
    cy.get('[data-testid="practice-general"] h2')
      .should("be.visible")
      .and("have.text", "General Components");
    cy.get('[data-testid="practice-general"] p')
      .should("be.visible")
      .and("have.text", "Click here to practice working with:");
    // Container exact content (li). !NOTE: space tab at the end!.
    const expectedItems = [
      " - Buttons ",
      " - Radio Buttons ",
      " - Dropdowns ",
      " - Checkboxes ",
      " - Links ",
    ];

    // Container have 5 elements `<li>`
    cy.get(".container-text.extra-info li").should(
      "have.length",
      expectedItems.length
    );

    // Each "li" has the correct text
    cy.get(".container-text.extra-info li").each((item, index) => {
      cy.wrap(item).should("have.text", expectedItems[index]);
    });
  });
  it("Component - Accordions", () => {
    cy.get('[data-testid="practice-accordions"]').should("be.visible");
    cy.get('[data-testid="practice-accordions"] h2')
      .should("be.visible")
      .and("have.text", "Accordions");
    cy.get('[data-testid="practice-accordions"] p')
      .should("be.visible")
      .and("have.text", "Click here to practice working with accordions");
  });
  it("Component - Popups", () => {
    cy.get('[data-testid="practice-random-overlay"]').should("be.visible");
    cy.get('[data-testid="practice-random-overlay"] h2')
      .should("be.visible")
      .and("have.text", "Popups");
    cy.get('[data-testid="practice-random-overlay"] p')
      .should("be.visible")
      .and("have.text", "Click here to practice working with random popups");
  });
  it("Component - Iframes", () => {
    cy.get('[data-testid="practice-iframe"]').should("be.visible");
    cy.get('[data-testid="practice-iframe"] h2')
      .should("be.visible")
      .and("have.text", "Iframes");
    cy.get('[data-testid="practice-iframe"] p')
      .should("be.visible")
      .and("have.text", "Click here to practice Iframes");
  });
  it("Component - Apis", () => {
    cy.get('[data-testid="practice-api"]').should("be.visible");
    cy.get('[data-testid="practice-api"] h2')
      .should("be.visible")
      .and("have.text", "Apis");
    cy.get('[data-testid="practice-api"] p')
      .should("be.visible")
      .and("have.text", "Click here to practice Api requests");
  });
  it("Component - Dynamic Text", () => {
    cy.get('[data-testid="practice-dynamic-text"]').should("be.visible");
    cy.get('[data-testid="practice-dynamic-text"] h2')
      .should("be.visible")
      .and("have.text", "Dynamic Text");
    cy.get('[data-testid="practice-dynamic-text"] p')
      .should("be.visible")
      .and("have.text", "Click here to practice Dynamic Text");
  });
  it("Component - File Upload", () => {
    cy.get('[data-testid="practice-file-upload"]').should("be.visible");
    cy.get('[data-testid="practice-file-upload"] h2')
      .should("be.visible")
      .and("have.text", "File Upload");
    cy.get('[data-testid="practice-file-upload"] p')
      .should("be.visible")
      .and("have.text", "Click here to practice Uploading files");
  });
  it("Component - Drag and Drop", () => {
    cy.get('[data-testid="practice-drag-drop"]').should("be.visible");
    cy.get('[data-testid="practice-drag-drop"] h2')
      .should("be.visible")
      .and("have.text", "Drag and drop");
    cy.get('[data-testid="practice-drag-drop"] p')
      .should("be.visible")
      .and("have.text", "Click here to practice Dragging and dropping");
  });
  it("Component - Contact Us Form", () => {
    cy.get('[data-testid="practice-contact-form"]').should("be.visible");
    cy.get('[data-testid="practice-contact-form"] h2')
      .should("be.visible")
      .and("have.text", "Contact Us Form");
    cy.get('[data-testid="practice-contact-form"] p')
      .should("be.visible")
      .and("have.text", "Click here to practice filling out forms");
  });
  it("Component - Mock Datalayer", () => {
    cy.get('[data-testid="practice-mock-data-layer"]').should("be.visible");
    cy.get('[data-testid="practice-mock-data-layer"] h2')
      .should("be.visible")
      .and("have.text", "Mock Datalayer");
    cy.get('[data-testid="practice-mock-data-layer"] p')
      .should("be.visible")
      .and(
        "have.text",
        "Click here to practice testing a mocked version of a datalayer"
      );
  });
  it("Component - File Download", () => {
    cy.get('[data-testid="practice-file-download"]').should("be.visible");
    cy.get('[data-testid="practice-file-download"] h2')
      .should("be.visible")
      .and("have.text", "File Download");
    cy.get('[data-testid="practice-file-download"] p')
      .should("be.visible")
      .and("have.text", "Click here to practice testing file downloading");
  });
  it("Component - Time testing", () => {
    cy.get('[data-testid="practice-clock"]').should("be.visible");
    cy.get('[data-testid="practice-clock"] h2')
      .should("be.visible")
      .and("have.text", "Time testing");
    cy.get('[data-testid="practice-clock"] p')
      .should("be.visible")
      .and("have.text", "Click here to practice testing time");
  });
});
