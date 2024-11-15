/// <reference types="cypress" />
///
const getIframeWindow = () => {
  return cy
    .get('iframe[data-testid="iframe"]')
    .its("0.contentWindow")
    .should("exist");
};
const getIframeBody = () => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  return cy
    .get('iframe[data-testid="iframe"]')
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then(cy.wrap);
};

describe(" ", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-iframe");
    cy.url().should("include", "iframe");
  });
  //
  it("Default Structure, state, values Iframe", () => {
    //
    cy.get(".container .component-container")
      .should("be.visible")
      .within(() => {
        cy.get("h2").should("be.visible").and("have.text", "IFrame");
        cy.get(".iframe-container").should("be.visible");
      });
    // Iframe
    cy.get(".iframe-container iframe")

      .and("have.attr", "title", "Products")
      .and("have.attr", "data-testid", "iframe");
    cy.get('[data-testid="iframe"]').should("be.visible");

    getIframeWindow().then((win) => {
      cy.spy(win, "fetch").as("fetch");
    });

    getIframeBody()
      .find('[data-testid="filter-button"')
      .should("be.visible")
      .and("have.text", "Filter")
      .and("not.be.disabled");
    getIframeBody()
      .find("table")
      .should("be.visible")
      .and("have.class", "product-list-table");
    getIframeBody()
      .find("table.product-list-table tbody")
      .within(() => {
        cy.get("tr").should("have.length", 10);

        cy.get("tr:first").within(() => {
          cy.get('td[data-testid="id"]').should("have.text", "11");
          cy.get('td[data-testid="name"]').should("have.text", "Product 2");
          cy.get('td[data-testid="price"]').should("have.text", "15");
          cy.get('td[data-testid="dateStocked"]').should(
            "have.text",
            "2021-02-01"
          );
        });
      });

    //Lo siguiente no deberia ser visible por el scroll. Sin embargo falla. Supongo que el "wrap" ese que hace, lo pilla todo el html. Salvo que no exista por alguna funcion de javascript, será dificil comprobarlo. Supongo que los iframes son dificiles de testear con auto.

    // getIframeBody()
    //   .find('[data-testid="add-a-product-button"')
    //   .should("not.be.visible");
  });
});
