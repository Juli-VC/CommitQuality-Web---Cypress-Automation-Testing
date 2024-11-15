/// <reference types="cypress" />
///
describe("Practice page components default structure test", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-general-components");
    cy.url().should("include", "general-components");
    cy.title().should("include", "CommitQuality - Test Automation Demo");
    // General structure 6 components (Buttons, radio b, select, checkboxes, links)
    cy.get(".container").should("be.visible").children().and("have.length", 6);
  });
  //
  it("No-messages previous tests", () => {
    // For Buttons
    cy.contains("Button right mouse clicked").should("not.exist");
    // For radio buttons
    cy.get(".radio-buttons-container p").should("not.exist");
    // For checkboxes
    cy.get(".checkbox-container p").should("not.exist");
  });
  //
  it("link back to practice ", () => {
    //-- Link "a", back to practice with url.
    cy.get(".container a")
      .should("be.visible")
      .and("include.text", "back to practice")
      .and("have.attr", "data-testid", "back-link")
      .and("have.css", "color", "rgb(0, 0, 255)");
  });
  it("Buttons component should contain the correct structure ", () => {
    // Container has tittle
    cy.get(".buttons-container")
      .find("h2")
      .should("be.visible")
      .and("have.text", " Buttons"); // space at beggining
    // Container has 3 inner buttons
    cy.get(".button-container")
      .find("button")
      .should("be.visible")
      .should("have.length", 3);

    // Verify each "buttons" inner element.
    cy.get('.button-container [data-testid="basic-click"]')
      .should("have.text", "Click me")
      .and("not.be.disabled");
    cy.get('.button-container [data-testid="double-click"]')
      .should("have.text", "Double click me")
      .and("not.be.disabled");
    cy.get('.button-container [data-testid="right-click"]')
      .should("contain", "Right click me")
      .and("not.be.disabled");
  });
  it("Radio-buttons component should contain the correct structure", () => {
    // Container has tittle
    cy.get(".radio-buttons-container")
      .find("h2")
      .should("be.visible")
      .and("have.text", " Radio buttons"); // space at beggining
    // radio buttons has 2 inputs
    cy.get(".radio-buttons-container")
      .find('input[type="radio"]')
      .should("be.visible")
      .should("have.length", 2);

    // Verify each inner components, have input radio and label.
    cy.get('.radio-button-container [data-testid="option1"]')
      .should("be.visible")
      .and("have.attr", "name", "option")
      .and("have.attr", "type", "radio")
      .and("have.value", "option1")
      .and("not.be.checked");
    cy.get('.radio-container [data-testid="option2"]')
      .should("be.visible")
      .and("have.attr", "name", "option")
      .and("have.attr", "type", "radio")
      .and("have.value", "option2")
      .and("not.be.checked");

    cy.get(".radio-button-container label")
      .should("be.visible")
      .and("have.text", "Radio button");
    cy.get(".radio-container label")
      .should("be.visible")
      .and("have.text", "Radio button 2");
  });
  it("Select component Default state Test", () => {
    // Container has title and select.
    cy.get(".dropdown-container").should("be.visible");
    cy.get(".dropdown-container")
      .find("h2")
      .should("be.visible")
      .and("have.text", " Select an option"); // space at beggining
    cy.get(".dropdown-container")
      .find("select")
      .should("be.visible")
      .and("have.length", 1);
    //Has a "Select element" and not be selected
    cy.get('[data-testid="dropdown"] select')
      .should("be.visible")
      .and("not.be.disabled")
      .and("not.be.selected")
      .and("have.value", "");

    //Has the default visible option
    cy.get('[data-testid="dropdown"] select > option:selected')
      .should("be.selected")
      .should("have.text", "Select an option");
  });
  it("Checkboxes component Pre-Test Default state", () => {
    // title visible
    cy.get(".checkbox-container")
      .should("be.visible")
      .and("contain", "Checkboxes");
    cy.get(".checkbox-container h2")
      .should("be.visible")
      .and("have.text", " Checkboxes"); // space at beggining

    // 3 checkboxes UNCHECKED, VISIBLE and NOT DISABLE
    cy.get(
      '[data-testid="checkbox1"], [data-testid="checkbox2"], [data-testid="checkbox3"]'
    )
      .should("not.be.checked")
      .and("not.be.disabled")
      .and("be.visible");
  });
  it("Links component default structure", () => {
    cy.get(".links-container.container-outline").should("be.visible");
    // Container has title Links.
    cy.get(".links-container.container-outline h2")
      .should("be.visible")
      .and("have.text", " Links"); // space at beggining

    // Note: double inner class. not a mistake
    cy.get(".links-container .links-container")
      .should("be.visible")
      .and("have.length", 3);
    // Youtube
    cy.contains(".links-container", "My Youtube")
      .should("be.visible")
      .find("a")
      .should("be.visible")
      .and("have.attr", "href", "https://www.youtube.com/@commitquality")
      .and("have.attr", "data-testid", "link-same-tab")
      .and("not.have.attr", "target", "_blank");
    // Open new tab
    cy.contains(".links-container", "Open my youtube in a new tab")
      .should("be.visible")
      .find("a")
      .should("be.visible")
      .and("have.attr", "href", "https://www.youtube.com/@commitquality")
      .and("have.attr", "rel", "noreferrer")
      .and("have.attr", "data-testid", "link-newtab")
      .and("have.attr", "target", "_blank");
    // Go to practice
    cy.contains(".links-container", "Go to practice page")
      .should("be.visible")
      .find("a")
      .should("be.visible")
      .and("have.attr", "href", "/practice")
      .and("have.attr", "rel", "noreferrer")
      .and("have.attr", "data-testid", "link-newtab-practice")
      .and("have.attr", "target", "_blank");
  });
});
