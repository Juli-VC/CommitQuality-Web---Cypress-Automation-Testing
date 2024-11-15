/// <reference types="cypress" />
///
describe("Products Page component tests", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/");
    cy.url().should("contain", "https://commitquality.com");
    cy.title().should("include", "CommitQuality - Test Automation Demo");
  });
  //
  it("Headline component text", () => {
    cy.get(".product-list-container").should("be.visible");

    cy.get('[data-testid="banner-container"]')
      .should("be.visible")
      .and("have.class", "banner-container");
    cy.get('[data-testid="banner-text"]')
      .should("be.visible")
      .and("have.class", "banner-message")
      .and(
        "have.text",
        "ADVERTISE YOUR PRODUCT / SERVICE HERE: Contact me on X @CommitQuality"
      );
    cy.get('[data-testid="banner-advert-link"]')
      .should("be.visible")
      .and("have.text", "@CommitQuality")
      .and("have.attr", "target", "_blank")
      .and("have.attr", "href", "https://x.com/commitquality");
  });
  it("Filter component", () => {
    //-- number of elements (input, submit, reset)
    cy.get(".filter-container")
      .should("be.visible")
      .children()
      .and("have.length", 3);
    //-- input
    cy.get(".filter-container input")
      .should("have.attr", "placeholder", "Filter by product name")
      .and("have.attr", "class", "filter-textbox")
      .and("have.value", "")
      .and("be.visible");
    //-- button
    cy.get('.filter-container [data-testid="filter-button"]')
      .should("have.text", "Filter")
      .and("not.be.disabled")
      .and("be.visible");
    //-- reset
    cy.get('.filter-container [data-testid="reset-filter-button"]')
      .should("have.text", "Reset")
      .and("not.be.disabled")
      .and("be.visible");
  });
  it("Table component", () => {
    //-- Headers table
    const headers = ["ID", "Name", "Price", "Date Stocked"];

    //-- Each th head and correctly order
    cy.get(".product-list-table thead th").each((header, index) => {
      cy.wrap(header).should("have.text", headers[index]);
    });
    //-- Table has 11 elements.
    cy.get("table.product-list-table tbody").within(() => {
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
    const expectedRows = [
      { id: "11", name: "Product 2", price: "15", dateStocked: "2021-02-01" },
      { id: "10", name: "Product 1", price: "10", dateStocked: "2021-01-01" },
      { id: "9", name: "Product 2", price: "15", dateStocked: "2021-02-01" },
      { id: "8", name: "Product 2", price: "15", dateStocked: "2021-02-01" },
      { id: "7", name: "Product 1", price: "10", dateStocked: "2021-01-01" },
      { id: "6", name: "Product 2", price: "15", dateStocked: "2021-02-01" },
      { id: "5", name: "Product 1", price: "10", dateStocked: "2021-01-01" },
      { id: "4", name: "Product 2", price: "15", dateStocked: "2021-02-01" },
      { id: "3", name: "Product 1", price: "10", dateStocked: "2021-01-01" },
      { id: "2", name: "Product 2", price: "15", dateStocked: "2021-02-01" },
    ];

    //-- TableContent default exact data.
    cy.get(".product-list-table tbody tr").each((row, index) => {
      cy.wrap(row).within(() => {
        cy.get('[data-testid="id"]').should(
          "have.text",
          expectedRows[index].id
        );
        cy.get('[data-testid="name"]').should(
          "have.text",
          expectedRows[index].name
        );
        cy.get('[data-testid="price"]').should(
          "have.text",
          expectedRows[index].price
        );
        cy.get('[data-testid="dateStocked"]').should(
          "have.text",
          expectedRows[index].dateStocked
        );
      });
    });

    // Show More
    cy.get('button[data-testid="show-more-button"]')
      .should("have.text", "Show More")
      .and("not.be.disabled")
      .and("be.visible");
    // Add a Product
    cy.get('button[data-testid="show-more-button"]');
    cy.get(".add-product-link a")
      .should("have.text", "Add a Product")
      .and("be.visible")
      .and("have.attr", "data-testid", "add-a-product-button")
      .and("have.attr", "href", "/add-product");
  });

  //////////////////////
});
