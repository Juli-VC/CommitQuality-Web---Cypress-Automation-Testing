/// <reference types="cypress" />
///
describe("ProductPage functionality tests", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/");
    cy.url().should("contain", "https://commitquality.com");
    cy.title().should("include", "CommitQuality - Test Automation Demo");
  });

  it('Filter by "product 1". Should find 5 elements.', () => {
    cy.get(".filter-container input")
      .type("product 1")
      .and("have.value", "product 1");
    //click Filter button
    cy.get('.filter-container [data-testid="filter-button"]').click();
    //-- Table has 5 elements (1 was hidden because size (show more button)).
    cy.get("table.product-list-table tbody").within(() => {
      cy.get("tr").should("have.length", 5);
      //Verify PRODUCT 1 is on all matches.
      cy.get('td[data-testid="name"]')
        .filter((index, el) => el.innerText === "Product 1")
        .should("have.length", 5);
    });
  });
  it('Filter&Reset. Filter by "product 1". Should find 5 elements. Reset, should show 11 elements again', () => {
    //-- Type name to filter by.
    cy.get(".filter-container input")
      .type("product 1")
      .and("have.value", "product 1");
    //-- click Filter button
    cy.get('.filter-container [data-testid="filter-button"]').click();
    //-- Table has 5 elements (note: 1 was hidden because size (show more button)).
    cy.get("table.product-list-table tbody").within(() => {
      cy.get("tr").should("have.length", 5);
      //Verify PRODUCT 1 is on all matches.
      cy.get('td[data-testid="name"]')
        .filter((index, el) => el.innerText === "Product 1")
        .should("have.length", 5);
    });
    //-- click Reset
    cy.get('.filter-container [data-testid="reset-filter-button"]').click();
    //-- First condition (11 elements) should be shown. Last should be Product 2
    cy.get("table.product-list-table tbody tr:first").within(() => {
      cy.get('td[data-testid="id"]').should("have.text", "11");
      cy.get('td[data-testid="name"]').should("have.text", "Product 2");
      cy.get('td[data-testid="price"]').should("have.text", "15");
      cy.get('td[data-testid="dateStocked"]').should("have.text", "2021-02-01");
    });
    // And "product 1", should -again- match only 4 (note: 1 hidden again)
    cy.get("table.product-list-table tbody")
      .find('td[data-testid="name"]')
      .filter((index, el) => el.innerText === "Product 1")
      .should("have.length", 4);
  });
  it('Add a product link. Should redirect to "add a product PAGE', () => {
    cy.get('[data-testid="add-a-product-button"]').click();
    cy.url().should("eq", "https://commitquality.com/add-product");
    cy.title().should("include", "CommitQuality - Test Automation Demo");
  });
});
