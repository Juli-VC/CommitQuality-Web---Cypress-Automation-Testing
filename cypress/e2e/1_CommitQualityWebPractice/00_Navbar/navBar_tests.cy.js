/// <reference types="cypress" />
///
describe("Login page components default structure test", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/");
    cy.url().should("contain", "https://commitquality.com");
    cy.title().should("include", "CommitQuality - Test Automation Demo");
    //Default nab-link on main page (/) should be Product, and color-orange.
    cy.get('[data-testid="navbar-products"]')
      .should("be.visible")
      .and("have.class", "active")
      .and("have.css", "color", "rgb(255, 165, 0)");
  });
  //
  it('nav-link "Add product"', () => {
    //Default nab-link on addproduct (/add-product) should be Product, and color-orange.
    cy.get('[data-testid="navbar-addproduct"]').click();
    cy.url().should("eq", "https://commitquality.com/add-product");
    cy.get('[data-testid="navbar-addproduct"]')
      .should("be.visible")
      .and("have.class", "active")
      .and("have.css", "color", "rgb(255, 165, 0)");
    //verify "product", previuos link:active, is color black, rest too.
    cy.get(
      '[data-testid="navbar-products"], [data-testid="navbar-practice"],[data-testid="navbar-learn"],[data-testid="navbar-login"]'
    )
      .should("be.visible")
      .and("not.have.class", "active")
      .and("have.css", "color", "rgb(51, 51, 51)");
  });
  it('nav-link "Practice"', () => {
    //Default nab-link on practice (/practice) should be practice, and color-orange.
    cy.get('[data-testid="navbar-practice"]').click();
    cy.url().should("eq", "https://commitquality.com/practice");
    cy.get('[data-testid="navbar-practice"]')
      .should("be.visible")
      .and("have.class", "active")
      .and("have.css", "color", "rgb(255, 165, 0)");
    //verify "product", previuos link:active, is color black.
    cy.get(
      '[data-testid="navbar-products"], [data-testid="navbar-addproduct"],[data-testid="navbar-learn"],[data-testid="navbar-login"]'
    )
      .should("be.visible")
      .and("not.have.class", "active")
      .and("have.css", "color", "rgb(51, 51, 51)");
  });
  it('nav-link "Learn"', () => {
    // Tricky test. Is must have a "if" condition. if user has logued or accepted youtube conditions/coockies.
    // If not, should find and click on "reject", wait a bit, and then check (url)
    // Otherwise, can not verify the correct YT url.
    // But here not testing user's preferences. Only original web itself.

    //Verify that the link has the target="_blank" attribute
    cy.get('[data-testid="navbar-learn"]')
      .should("have.attr", "href", "https://www.youtube.com/@commitquality")
      .and("have.attr", "target", "_blank");

    // Remove the target attribute to open the link in the same tab
    cy.get('[data-testid="navbar-learn"]')
      .invoke("removeAttr", "target")
      .click();

    // // Allow a brief wait for the redirection to the actual YouTube page
    // cy.wait(5000); // Wait for 2 seconds for the redirection

    // // Verify that the final URL contains the expected YouTube URL
    // cy.url().should("include", "www.youtube.com/@commitquality");
  });
  it('nav-link "Login"', () => {
    //Default nab-link on login (/login) should be login, and color-orange.
    cy.get('[data-testid="navbar-login"]').click();
    cy.url().should("eq", "https://commitquality.com/login");
    cy.get('[data-testid="navbar-login"]')
      .should("be.visible")
      .and("have.class", "active")
      .and("have.css", "color", "rgb(255, 165, 0)");
    //verify "product", previuos link:active, is color black.
    cy.get(
      '[data-testid="navbar-products"], [data-testid="navbar-practice"],[data-testid="navbar-learn"],[data-testid="navbar-addproduct"]'
    )
      .should("be.visible")
      .and("not.have.class", "active")
      .and("have.css", "color", "rgb(51, 51, 51)");
  });

  it('nav-link "Products"', () => {
    //Previus. Giving we start at /, it should start on other tab/link.
    cy.visit("https://commitquality.com/practice");
    cy.url().should("contain", "https://commitquality.com/practice");
    //Default nab-link on products (/) should be products, and color-orange.
    cy.get('[data-testid="navbar-products"]').click();
    cy.url().should("eq", "https://commitquality.com/");
    cy.get('[data-testid="navbar-products"]')
      .should("be.visible")
      .and("have.class", "active")
      .and("have.css", "color", "rgb(255, 165, 0)");
    //verify "product", previuos link:active, is color black.
    cy.get(
      '[data-testid="navbar-addproduct"], [data-testid="navbar-practice"],[data-testid="navbar-learn"],[data-testid="navbar-login"]'
    )
      .should("be.visible")
      .and("not.have.class", "active")
      .and("have.css", "color", "rgb(51, 51, 51)");
  });
  ///////
});
