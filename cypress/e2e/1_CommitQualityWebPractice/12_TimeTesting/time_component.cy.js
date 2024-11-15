/// <reference types="cypress" />
///
describe("Time default component structure ", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-clock");
    cy.url().should("include", "clock");
  });
  //
  it("Time component", () => {
    //
    cy.get(".clock-container")
      .should("be.visible")
      .within(() => {
        cy.get("a")
          .should("be.visible")
          .and("have.attr", "data-testid", "back-link")
          .and("include.text", "back to practice");

        cy.contains("h2", "Current time")
          .next()
          .should("have.attr", "data-testid", "clock");

        cy.contains("h2", "COUNTDOWN TIMER TO WIN A SPECIAL PRIZE")
          .next()
          .should("have.attr", "data-testid", "timer");

        cy.get('[data-testid="clock"]').should("be.visible");
        cy.get('[data-testid="timer"]').should("be.visible");

        // Not exist winning message.
        cy.contains("YOU WON... GO SUBSCRIBE TO COMMIT QUALITY").should(
          "not.exist"
        );
      });
  });
  it(" 'a-link' should navigate back to practice when clicking the back link", () => {
    cy.get('[data-testid="back-link"]').click();
    cy.url().should("not.include", "clock");
    cy.url().should("include", "practice");
  });
});
