/// <reference types="cypress" />
///
describe("Buttons Click types", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/add-product");
    cy.url().should("eq", "https://commitquality.com/add-product");
    cy.title().should("include", "CommitQuality - Test Automation Demo");
  });
  it("Default page tests", () => {
    // Default Page checking
    cy.visit("https://commitquality.com/");
    cy.url().should("eq", "https://commitquality.com/");
    cy.title().should("include", "CommitQuality - Test Automation Demo");

    //Table has 11 elements.
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
    // Show More funtion.
    // Inicialmente, verifica el número de productos visibles.(del 11 al 2)
    cy.get("tbody tr").should("have.length", 10);

    // Haz clic en el botón "Show More"
    cy.get('button[data-testid="show-more-button"]').click();

    // Verifica que se hayan cargado más productos (dependiendo de tu implementación)
    cy.get("tbody tr").should("have.length.greaterThan", 10);
    // En este caso, sabemos que tiene 11 resultados.
    cy.get("tbody tr").should("have.length", 11);
  });

  // Enter a product
  it("Enter a product", () => {
    // Test "Name"
    cy.get('input[data-testid="product-textbox"]')
      .type("Watermelon")
      .should("have.value", "Watermelon");

    // Test "Price"
    cy.get('input[data-testid="price-textbox"]')
      .type("5")
      .should("have.value", "5");

    // Test "Date Stocked"
    cy.get('input[data-testid="date-stocked"]')
      .type("2024-10-15")
      .should("have.value", "2024-10-15");

    //Should NOT have any error-message, before submit
    cy.get('.error-message, [data-testid="all-fields-validation"]').should(
      "not.exist"
    );

    // Click Submit
    cy.get('[data-testid="submit-form"]').click();

    // Check new product submited
    cy.url().should("include", "https://commitquality.com/");

    // Check on table the new added product
    cy.get("table.product-list-table tbody tr:first").within(() => {
      // Verifica que los valores de las celdas coincidan
      cy.get('td[data-testid="id"]').should("have.text", "12");
      cy.get('td[data-testid="name"]').should("have.text", "Watermelon");
      cy.get('td[data-testid="price"]').should("have.text", "5");
      cy.get('td[data-testid="dateStocked"]').should("have.text", "2024-10-15");
    });

    //Check PRODUCT 1
    // cy.get("table.product-list-table tbody").within(() => {
    //   cy.contains('td[data-testid="name"]', "Product 1").should("be.visible");
    // });
    // This only finds the first "match"

    cy.get("table.product-list-table tbody")
      .find('td[data-testid="name"]')
      .filter((index, el) => el.innerText === "Product 1")
      .should("have.length", 4); // Check exactly that finds the 4: "Product 1"

    // Filter by NEW product added
    //Type new added product
    cy.get(".filter-container input")
      .should("have.attr", "placeholder", "Filter by product name")
      .and("have.attr", "class", "filter-textbox")
      .and("have.value", "")
      .and("be.visible")
      .type("Watermelon")
      .and("have.value", "Watermelon");
    //click Filter button
    cy.get('.filter-container [data-testid="filter-button"]')
      .should("have.text", "Filter")
      .and("be.enabled")
      .and("be.visible")
      .click();
    //Check if table results are filtered correcty.
    cy.get("table.product-list-table tbody tr:first").within(() => {
      cy.get('td[data-testid="id"]').should("have.text", "12");
      cy.get('td[data-testid="name"]').should("have.text", "Watermelon");
      cy.get('td[data-testid="price"]').should("have.text", "5");
      cy.get('td[data-testid="dateStocked"]').should("have.text", "2024-10-15");
    });
    //Knowning that only 1 result expected, only 1 element on table.
    cy.get("table.product-list-table tbody tr").should("have.length", 1);

    // Reset filter and check again.
    //-- click reset button
    cy.get('.filter-container [data-testid="reset-filter-button"]')
      .should("have.text", "Reset")
      .and("be.enabled")
      .and("be.visible")
      .click();
    //-- Check if table results are filtered correcty. Last should be watermelon
    cy.get("table.product-list-table tbody tr:first").within(() => {
      cy.get('td[data-testid="id"]').should("have.text", "12");
      cy.get('td[data-testid="name"]').should("have.text", "Watermelon");
      cy.get('td[data-testid="price"]').should("have.text", "5");
      cy.get('td[data-testid="dateStocked"]').should("have.text", "2024-10-15");
    });
    //-- And product 1 shows, and 4 times
    cy.get("table.product-list-table tbody")
      .find('td[data-testid="name"]')
      .filter((index, el) => el.innerText === "Product 1")
      .should("have.length", 4);

    //Add a second new product and check if both new added product are okey.
    //-- Click "Add product" button
    cy.get('[data-testid="add-a-product-button"]')
      .should("have.text", "Add a Product")
      .and("have.attr", "href", "/add-product")
      .click();
    cy.url().should("eq", "https://commitquality.com/add-product");
    cy.title().should("include", "CommitQuality - Test Automation Demo");
    //-- Add new product (Apple, 1.50, 20-10-20024)
    cy.get('input[data-testid="product-textbox"]')
      .type("Apple")
      .should("have.value", "Apple");
    cy.get('input[data-testid="price-textbox"]')
      .type("1.50")
      .should("have.value", "1.50");
    cy.get('input[data-testid="date-stocked"]')
      .type("2024-10-20")
      .should("have.value", "2024-10-20");
    //Should NOT have any error-message, before submit
    cy.get('.error-message, [data-testid="all-fields-validation"]').should(
      "not.exist"
    );
    // Click Submit
    cy.get('[data-testid="submit-form"]').click();

    // Check new product submited
    cy.url().should("include", "https://commitquality.com/");

    // Check on table the new SECOND added product
    cy.get("table.product-list-table tbody tr:first").within(() => {
      cy.get('td[data-testid="id"]').should("have.text", "13");
      cy.get('td[data-testid="name"]').should("have.text", "Apple");
      cy.get('td[data-testid="price"]').should("have.text", "1.50");
      cy.get('td[data-testid="dateStocked"]').should("have.text", "2024-10-20");
    });
    // Check on table the first-previous added product
    cy.get("table.product-list-table tbody tr")
      .eq(1)
      .within(() => {
        cy.get('td[data-testid="id"]').should("have.text", "12");
        cy.get('td[data-testid="name"]').should("have.text", "Watermelon");
        cy.get('td[data-testid="price"]').should("have.text", "5");
        cy.get('td[data-testid="dateStocked"]').should(
          "have.text",
          "2024-10-15"
        );
      });
  });
});
