/// <reference types="cypress" />
///
describe("ContactForm component default pre-tests", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-contact-form");
    cy.url().should("include", "/practice-contact-form");
    cy.title().should("include", "CommitQuality - Test Automation Demo");
  });
  //
  it("Default Contact Form default Structure and no error-messages.", () => {
    // Get today's date in the 'YYYY-MM-DD' format
    const today = new Date().toISOString().split("T")[0]; // "2024-10-20" format

    //Structure and default states.
    cy.get(".contact-form")
      .should("be.visible")
      .within(() => {
        //-- Has the Title "Contact Us" with a H2 and be visible.
        cy.contains("h2", "Contact Us").should("be.visible");
        //-- Has a form element visible. In this case, to have the novalidate attr.
        cy.get("form").should("be.visible").and("have.attr", "novalidate");
        //-- Inside of the form has 5 field group.
        cy.get("form").find(".form-group").and("have.length", 5);
        //-- Inside of the form, has a button and be a submit type enable.
        cy.get("form")
          .find("button")
          .and("have.text", "Submit")
          .and("be.visible")
          .and("not.be.disabled")
          .and("have.attr", "type", "submit");
        //-- Each form-group has a input and label correlated.
        //    Be empy / have placeholder / defaul value.
        //----Name
        cy.contains(".form-group", "Name")
          .should("be.visible")
          .within(() => {
            cy.get("label")
              .should("be.visible")
              .and("have.attr", "for", "name")
              .and("have.text", "Name:");
            cy.get("input")
              .should("be.visible")
              .and("be.empty")
              .and("have.attr", "type", "text")
              .and("have.attr", "name", "name")
              .and("have.attr", "id", "name")
              .and("have.attr", "data-testid", "name")
              .and("have.attr", "required");
          });
        //----Email
        cy.contains(".form-group", "Email")
          .should("be.visible")
          .within(() => {
            cy.get("label")
              .should("be.visible")
              .and("have.attr", "for", "email")
              .and("have.text", "Email:");
            cy.get("input")
              .should("be.visible")
              .and("be.empty")
              .and("have.attr", "type", "email")
              .and("have.attr", "name", "email")
              .and("have.attr", "id", "email")
              .and("have.attr", "data-testid", "email")
              .and("have.attr", "required");
          });
        //----Query Type
        cy.contains(".form-group", "Query Type")
          .should("be.visible")
          .within(() => {
            cy.get("label")
              .should("be.visible")
              .and("have.attr", "for", "query-type")
              .and("have.text", "Query Type:");
            cy.get("select")
              .should("be.visible")
              .and("have.value", "")
              .and("have.attr", "name", "queryType")
              .and("have.attr", "id", "query-type")
              .and("have.attr", "data-testid", "query-type")
              .and("have.attr", "required");
          });
        //----Date of Birth:
        cy.contains(".form-group", "Date of Birth:")
          .should("be.visible")
          .within(() => {
            cy.get("label")
              .should("be.visible")
              .and("have.attr", "for", "dob")
              .and("have.text", "Date of Birth:");
            cy.get("input")
              .should("be.visible")
              .and("have.attr", "type", "date")
              .and("have.attr", "name", "dob")
              .and("have.attr", "id", "dob")
              .and("have.attr", "data-testid", "dob")
              .and("have.attr", "max", today)
              .and("have.attr", "required");
          });
        //----Button
        cy.contains("form", "Submit")
          .should("be.visible")
          .within(() => {
            cy.get("button")
              .should("be.visible")
              .and("not.be.disabled")
              .and("have.attr", "type", "submit")
              .and("have.attr", "data-testid", "submit-button");
          });
      });
    // Error message not showing pre-state (divs class error)
    cy.get(".error").should("not.exist");
  });
});
