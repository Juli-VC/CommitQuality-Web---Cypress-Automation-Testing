/// <reference types="cypress" />
///

describe("Checkboxes functionality tests", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-general-components");
    cy.url().should("include", "general-components");
  });

  it("Checkboxes component Pre-Test Default state", () => {
    // title visible
    cy.get(".checkbox-container.container-outline")
      .should("be.visible")
      .and("contain", "Checkboxes");
    cy.get(".checkbox-container h2")
      .should("be.visible")
      .and("have.text", " Checkboxes"); // space at beggining

    // 3 checkboxes UNCHECKED, VISIBLE and NOT DISABLE. And no "p" messages.
    cy.get(
      '[data-testid="checkbox1"], [data-testid="checkbox2"], [data-testid="checkbox3"]'
    )
      .should("not.be.checked")
      .and("not.be.disabled")
      .and("be.visible");

    cy.get(".checkbox-container").find("p").should("not.exist");

    // Inner structure of corresponding input and label.
    cy.get('input[data-testid="checkbox1"]')
      .closest(".checkbox-container")
      .within(() => {
        // Comprueba que el input tiene el atributo name="checkbox1"
        cy.get('input[type="checkbox"]').should(
          "have.attr",
          "name",
          "checkbox1"
        );

        // Comprueba que el label tenga el texto "Checkbox 1"
        cy.get('label[data-testid="checkbox1-label"]')
          .should("have.text", "Checkbox 1")
          .and("be.visible");
      });

    cy.get('input[data-testid="checkbox2"]')
      .closest(".checkbox-container") // Selecciona el contenedor más cercano
      .within(() => {
        // Comprueba que el input tiene el atributo name="checkbox2"
        cy.get('input[type="checkbox"]').should(
          "have.attr",
          "name",
          "checkbox2"
        );

        // Comprueba que el label tenga el texto "Checkbox 2"
        cy.get('label[data-testid="checkbox1-label"]')
          .should("have.text", "Checkbox 2")
          .and("be.visible");
      });

    cy.get('input[data-testid="checkbox3"]')
      .closest(".checkbox-container") // Selecciona el contenedor más cercano
      .within(() => {
        // Comprueba que el input tiene el atributo name="checkbox3"
        cy.get('input[type="checkbox"]').should(
          "have.attr",
          "name",
          "checkbox3"
        );

        // Comprueba que el label tenga el texto "Checkbox 3"
        cy.get('label[data-testid="checkbox1-label"]')
          .should("have.text", "Checkbox 3")
          .and("be.visible");
      });
  });
});
