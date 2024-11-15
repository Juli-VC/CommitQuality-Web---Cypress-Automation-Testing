/// <reference types="cypress" />
///
describe("Time default component structure ", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-clock");
    cy.url().should("include", "clock");
    // Not exist winning message.
    cy.contains("YOU WON... GO SUBSCRIBE TO COMMIT QUALITY").should(
      "not.exist"
    );
  });
  //
  it("Current time should star at 'current time' ", () => {
    const clockSelector = '[data-testid="clock"]';

    // Get the current time formatted as needed (24-hour format)
    const realTime = new Date().toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Use false for 24-hour format
    });

    // Check the displayed time in the application
    cy.get(clockSelector)
      .invoke("text")
      .then((displayedTime) => {
        expect(displayedTime.trim()).to.equal(realTime.trim());
      });
  });
  it("current Time should update when 1 sec passed", () => {
    const currentTimeSelector = '[data-testid="clock"]';

    cy.get(currentTimeSelector)
      .invoke("text")
      .then((initialTime) => {
        cy.wait(1000);

        // Check that the clock value has changed
        cy.get(currentTimeSelector)
          .invoke("text")
          .should("not.equal", initialTime);
      });
  });
  it("One AND five minute count-down from 5:00 to 4:00, AND 5 to 0. Should display winning message", () => {
    const timerSelector = '[data-testid="timer"]';
    const clockSelector = '[data-testid="clock"]';

    // Check the initial timer value
    cy.get(timerSelector).invoke("text").should("equal", "5:00");

    // Wait for 60 seconds (1 minute)
    cy.wait(60000);

    // After 1 minute, check that the timer value is now 4:00
    cy.get(timerSelector).invoke("text").should("equal", "4:00");

    // Keep waiting 4 minutes (1 min already passed)
    cy.wait(240000);
    cy.get(timerSelector).invoke("text").should("equal", "0:00");
    cy.get('[data-testid="message"]', { timeout: 1000 })
      .should("be.visible")
      .and("include.text", "YOU WON... GO SUBSCRIBE TO COMMIT QUALITY");

    // Besides, current time should match NEW current time.
    //This and before could be a function, to not repeat code.

    // Check the displayed time in the application
    cy.get(clockSelector)
      .invoke("text")
      .then((displayedTime) => {
        // Get the current time formatted as needed (24-hour format)
        const realTime = new Date().toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false, // Use false for 24-hour format
        });

        // Log the displayed time and real time for debugging
        console.log("Displayed Time: ", displayedTime.trim());
        console.log("Real Time: ", realTime.trim());

        // Convert the time strings to just seconds (HH:mm:ss format)
        const displayedSeconds = new Date(
          `1970-01-01T${displayedTime.trim()}`
        ).getSeconds();
        const realSeconds = new Date(
          `1970-01-01T${realTime.trim()}`
        ).getSeconds();

        // Allow a tolerance of +/- 1 second
        expect(Math.abs(displayedSeconds - realSeconds)).to.be.lessThan(2); // 2 seconds tolerance
      });
  });
});
