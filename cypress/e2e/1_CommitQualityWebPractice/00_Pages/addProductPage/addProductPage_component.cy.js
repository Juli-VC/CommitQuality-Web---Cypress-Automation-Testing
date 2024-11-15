/// <reference types="cypress" />
///
describe("Buttons Click types", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/add-product");
    cy.url().should("eq", "https://commitquality.com/add-product");
    cy.title().should("include", "CommitQuality - Test Automation Demo");
    //Error message should NOT exist
    cy.get(".error-message").should("not.exist");
    cy.get(".error").should("not.exist");
  });
  //
  // Test field. Should have correct labels and input attributes, and correlated
  it("Name Should have correct labels and input attributes, and correlated", () => {
    cy.get('label[for="name"]')
      .closest(".form-group")
      .within(() => {
        cy.get('input[data-testid="product-textbox"]').should(
          "have.attr",
          "name",
          "name"
        );
        cy.get('label[for="name"]').should("have.text", "Name");
      });
  });
  it("Price Should have correct labels and input attributes, and correlated", () => {
    cy.get('label[for="price"]')
      .closest(".form-group")
      .within(() => {
        cy.get('input[data-testid="price-textbox"]').should(
          "have.attr",
          "name",
          "price"
        );
        cy.get('label[for="price"]').should("have.text", "Price");
      });
  });
  it("Date Should have correct labels and input attributes, and correlated", () => {
    cy.get('label[for="dateStocked"]')
      .closest(".form-group")
      .within(() => {
        cy.get('input[data-testid="date-stocked"]').should(
          "have.attr",
          "name",
          "dateStocked"
        );
        cy.get('label[for="dateStocked"]').should("have.text", "Date Stocked");
      });
  });
  // Name/Price/Date correct default State
  it("Fields Name/Price/Date correct default State", () => {
    // Test "Name"
    cy.get('input[data-testid="product-textbox"]')
      .should("have.attr", "id", "name")
      .and("have.attr", "name", "name")
      .and("have.attr", "placeholder", "Enter a product name")
      .and("have.attr", "required");
    cy.get('input[data-testid="product-textbox"]').should(
      "have.attr",
      "required"
    );
    cy.get('input[data-testid="product-textbox"]').should(
      "have.attr",
      "type",
      "text"
    );
    // Test "Price"
    cy.get('input[data-testid="price-textbox"]')
      .should("have.attr", "id", "price")
      .and("have.attr", "name", "price")
      .and("have.attr", "placeholder", "Enter a price")
      .and("have.attr", "required");
    cy.get('input[data-testid="price-textbox"]').should(
      "have.attr",
      "required"
    );
    cy.get('input[data-testid="price-textbox"]').should(
      "have.attr",
      "type",
      "text" // Should be type=number, but I think verification is on "hidden" js frontend (react prob).
    );
    // Test "Date Stocked"
    cy.get('input[data-testid="date-stocked"]')
      .should("have.attr", "id", "dateStocked")
      .and("have.attr", "name", "dateStocked")
      .and("have.attr", "required");
    cy.get('input[data-testid="date-stocked"]').should("have.attr", "required");
    cy.get('input[data-testid="date-stocked"]').should(
      "have.attr",
      "type",
      "date"
    );
    // Verifica el botón "Submit"
    cy.get('button[data-testid="submit-form"]')
      .should("have.text", "Submit")
      .and("have.attr", "type", "submit")
      .and("be.enabled")
      .and("be.visible");

    // Verifica el botón "Cancel"
    cy.get('a[data-testid="cancel-button"]')
      .should("have.text", "cancel")
      .and("have.attr", "href", "/")
      .and("be.visible");
  });
  // FAILED submit product
  it("Enter a invalid Name product", () => {
    // Test "Name"
    cy.get('input[data-testid="product-textbox"]').type("W");

    // Test "Price"
    cy.get('input[data-testid="price-textbox"]').type("5");

    // Test "Date Stocked"
    cy.get('input[data-testid="date-stocked"]')
      .type("2024-10-15")
      .should("have.value", "2024-10-15");

    // Click Submit
    cy.get('[data-testid="submit-form"]').click();

    //Should fail and show error messages (2, name and bottom)
    cy.get('input[data-testid="product-textbox"]')
      .closest(".form-group")
      .within(() => {
        cy.get(".error-message")
          .should("exist")
          .and("be.visible")
          .and("have.text", "Name must be at least 2 characters.");
      });
    cy.get('[data-testid="all-fields-validation"]')
      .should("exist")
      .and("be.visible")
      .and("have.text", "Errors must be resolved before submitting");

    //alternativa. Que solo tenga 1 mensage de error en labels zone. (clase error-message), y sea ese texto
    //Asi comprobamos que no se activen los otros errores cuando en teoría están bien.
    cy.get(".error-message")
      .should("have.length", 1)
      .and("have.text", "Name must be at least 2 characters.");
  });
  it("Enter a invalid Price product", () => {
    // Test "Name"
    cy.get('input[data-testid="product-textbox"]').type("Watermelon");

    // Test "Price"
    //cy.get('input[data-testid="price-textbox"]').type("");

    // Test "Date Stocked"
    cy.get('input[data-testid="date-stocked"]')
      .type("2024-10-15")
      .should("have.value", "2024-10-15");

    // Click Submit
    cy.get('[data-testid="submit-form"]').click();

    //Should fail and show error messages (2, name and bottom)
    cy.get('input[data-testid="price-textbox"]')
      .closest(".form-group")
      .within(() => {
        cy.get(".error-message")
          .should("exist")
          .and("be.visible")
          .and("have.text", "Price must not be empty and within 10 digits");
      });
    cy.get('[data-testid="all-fields-validation"]')
      .should("exist")
      .and("be.visible")
      .and("have.text", "Errors must be resolved before submitting");

    //Fail case with more than 10 numbers
    cy.get('input[data-testid="price-textbox"]').type("1234567891011");
    cy.get('input[data-testid="price-textbox"]')
      .closest(".form-group")
      .within(() => {
        cy.get(".error-message")
          .should("exist")
          .and("be.visible")
          .and("have.text", "Price must not be empty and within 10 digits");
      });
    cy.get('[data-testid="all-fields-validation"]')
      .should("exist")
      .and("be.visible")
      .and("have.text", "Errors must be resolved before submitting");

    //alternativa. Que solo tenga 1 mensage de error en labels zone. (clase error-message), y sea ese texto
    //Asi comprobamos que no se activen los otros errores cuando en teoría están bien.
    cy.get(".error-message")
      .should("have.length", 1)
      .and("have.text", "Price must not be empty and within 10 digits");
  });
  it("Enter a invalid Date product", () => {
    // Test "Name"
    cy.get('input[data-testid="product-textbox"]').type("Watermelon");
    // Test "Price"
    cy.get('input[data-testid="price-textbox"]').type("5");
    // Test "Date Stocked"
    /*cy.get('input[data-testid="date-stocked"]')
      .type("2024-10-15")
      .should("have.value", "2024-10-15"); */

    // Click Submit
    cy.get('[data-testid="submit-form"]').click();
    //Should fail and show error messages (2, name and bottom)
    cy.get('input[data-testid="date-stocked"]')
      .closest(".form-group")
      .within(() => {
        cy.get(".error-message")
          .should("exist")
          .and("be.visible")
          .and("have.text", "Date must not be empty.");
      });
    cy.get('[data-testid="all-fields-validation"]')
      .should("exist")
      .and("be.visible")
      .and("have.text", "Errors must be resolved before submitting");
    //Enter invalid Date (2025)
    cy.get('input[data-testid="date-stocked"]')
      .clear()
      .type("2025-02-25")
      .should("have.value", "2025-02-25");
    cy.get('[data-testid="submit-form"]').click();
    cy.get('input[data-testid="date-stocked"]')
      .closest(".form-group")
      .within(() => {
        cy.get(".error-message")
          .should("exist")
          .and("be.visible")
          .and("have.text", "Date must not be in the future.");
      });
    cy.get('[data-testid="all-fields-validation"]')
      .should("exist")
      .and("be.visible")
      .and("have.text", "Errors must be resolved before submitting");
    //Enter invalid Date (0022)
    cy.get('input[data-testid="date-stocked"]')
      .clear()
      .type("1650-10-15")
      .should("have.value", "1650-10-15");
    cy.get('[data-testid="submit-form"]').click();
    cy.get('input[data-testid="date-stocked"]')
      .closest(".form-group")
      .within(() => {
        cy.get(".error-message")
          .should("exist")
          .and("be.visible")
          .and("have.text", "Date must not be older than 100 years.");
      });
    cy.get('[data-testid="all-fields-validation"]')
      .should("exist")
      .and("be.visible")
      .and("have.text", "Errors must be resolved before submitting");
  });

  // TODO list:
  // - When input (name, price, date) is focus, and not even type anything, if lose/change focus, should show error message
  // Not sure if this behaviour is intended or not. I personally dont see it necessary.
});
