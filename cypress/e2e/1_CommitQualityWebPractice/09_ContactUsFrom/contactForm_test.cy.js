/// <reference types="cypress" />
///
describe("ContactForm functionality test using fixture", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-contact-form");
    cy.url().should("include", "/practice-contact-form");
    cy.title().should("include", "CommitQuality - Test Automation Demo");
  });
  //
  it("Form application submit using Fixture", () => {
    // Import fixture and alias.
    cy.fixture("fixturesData.json").as("fixturesData");
    // Extracting data and type the inputs
    cy.get("@fixturesData").then((dataJson) => {
      //
      cy.get('form [data-testid="name"]')
        .type(dataJson.name)
        .should("have.value", dataJson.name);
      //
      cy.get('form [data-testid="email"]')
        .type(dataJson.email)
        .should("have.value", dataJson.email);
      //
      cy.get('form [data-testid="query-type"]')
        .select(dataJson.queryType)
        .should("have.value", dataJson.queryType);
      //
      cy.get('form [data-testid="dob"]')
        .type(dataJson.dateOfBirth)
        .should("have.value", dataJson.dateOfBirth);
      //
    });
    // Test if not error-message. Should not exist div-class error.
    cy.get(".error").should("not.exist");
    // Test if not success-message. Should not exist div-class.
    cy.get(".success-message").should("not.exist");
    cy.contains('"Thanks for contacting us, we will never respond!"').should(
      "not.exist"
    );
    // Checkbox.
    cy.get('[data-testid="practice-checkbox"]')
      .should("not.be.checked")
      .check()
      .should("be.checked")
      .closest(".form-group")
      .find(".error")
      .should("not.exist");
    //Submit
    cy.get(".error").should("not.exist");
    cy.get('[data-testid="submit-button"]').click();
    // Should show green confirmation message, and form should be cleared.
    cy.get(".success-message")
      .should("be.visible")
      .and("have.text", "Thanks for contacting us, we will never respond!")
      .and(
        "have.css",
        "color",
        "rgb(0, 128, 0)" //green
      );
    cy.get(
      '[data-testid="name"],[data-testid="email"],[data-testid="query-type"],[data-testid="dob"]'
    ).should("have.value", "");
    cy.get('[data-testid="practice-checkbox"]').should("not.be.checked");
    cy.get(".error").should("not.exist");

    //Click "back to practice" and check url change.
    //-- Pre-test. URL should be contact-form.
    cy.url().should("include", "/practice-contact-form");
    //--click
    cy.get('[data-testid="back-link"]')
      .should("be.visible")
      .and("include.text", "back to practice")
      .and(
        "have.css",
        "color",
        "rgb(0, 0, 255)" //blue
      )
      .click();
    //-- Test new URL.
    cy.url()
      .should("include", "/practice")
      .and("not.include", "/practice-contact-form");
  });
});
