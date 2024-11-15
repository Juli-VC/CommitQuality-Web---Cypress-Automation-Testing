/// <reference types="cypress" />
///
describe("Api functionality. Get and respond tests.", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-api");
    cy.url().should("include", "api");
  });
  //
  it("Api default structure, state, values...", () => {
    //
    // Should NOT exist pre-state.
    cy.get(".api-container p").should("not.exist");
    cy.get(".api-container pre").should("not.exist");
    cy.contains("Status code").should("not.exist");

    //Click. Should show respond api-request.
    cy.get('[data-testid="get-button"')
      .should("be.visible")
      .and("not.be.disabled")
      .click();
    cy.get(".api-container p", { timeout: 10000 })
      .should("be.visible")
      .and("include.text", "Status Code");
    cy.get(".api-container pre", { timeout: 10000 }).should("be.visible");
  });
  it("Api intercept mock", () => {
    // Intercept "get", to moxy respond.
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/todos/1", {
      statusCode: 200,
      body: {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
      },
    }).as("getTodo");

    // Click request get.
    cy.get('button[data-testid="get-button"]').click();

    // wait for intercept.
    cy.wait("@getTodo", { timeout: 10000 });

    // Transform html text to json to compare.
    cy.get("pre", { timeout: 10000 }).should(($pre) => {
      const expectedResponse = {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
      };
      const actualResponse = JSON.parse($pre.text());
      expect(actualResponse).to.deep.equal(expectedResponse);
    });
  });
  it("Real intercept comparission", () => {
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/todos/1").as(
      "getIntercept"
    );
    // Click request get.
    cy.get('button[data-testid="get-button"]').click();

    cy.wait("@getIntercept").then((interception) => {
      const request = interception.request;
      const response = interception.response;

      cy.log(request);
      cy.log(response);
      console.log("Request:", request);
      console.log("Response:", response);

      expect(response.statusCode, { timeout: 10000 }).to.eq(200);

      expect(response.body).to.have.property("userId", 1);
      expect(response.body).to.have.property("id", 1);
      expect(response.body).to.have.property("title", "delectus aut autem");
      expect(response.body).to.have.property("completed", false);
    });
    //Check on html
    cy.get(".api-container p", { timeout: 10000 })
      .should("be.visible")
      .and("include.text", "Status Code");
    cy.get(".api-container pre", { timeout: 10000 }).should("be.visible");
  });
});
