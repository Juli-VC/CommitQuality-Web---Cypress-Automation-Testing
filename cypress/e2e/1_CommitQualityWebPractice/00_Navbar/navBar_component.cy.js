/// <reference types="cypress" />
///
describe("Login page components default structure test", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/");
    cy.url().should("contain", "https://commitquality.com");
    cy.title().should("include", "CommitQuality - Test Automation Demo");
  });
  //
  it("Navbar component structure", () => {
    cy.get(".navbar").should("be.visible");
    cy.get(".navbar .nav-links").should("be.visible");

    // Verify each nav-link with corresponding href and text.
    const links = [
      { id: "navbar-products", href: "/", text: "Products" },
      { id: "navbar-addproduct", href: "/add-product", text: "Add Product" },
      { id: "navbar-practice", href: "/practice", text: "Practice" },
      {
        id: "navbar-learn",
        href: "https://www.youtube.com/@commitquality",
        text: "Learn",
        target: "_blank",
      },
      { id: "navbar-login", href: "/login", text: "Login" },
    ];

    links.forEach((link) => {
      cy.get(`[data-testid="${link.id}"]`)
        .should("have.attr", "href", link.href)
        .and("contain.text", link.text);

      if (link.target) {
        cy.get(`[data-testid="${link.id}"]`).should(
          "have.attr",
          "target",
          link.target
        );
      }
    });
    //Default nab-link on main page (/) should be Product, and color-orange.
    cy.get('[data-testid="navbar-products"]')
      .should("be.visible")
      .and("have.class", "active")
      .and("have.css", "color", "rgb(255, 165, 0)");
  });
  ///////
});
