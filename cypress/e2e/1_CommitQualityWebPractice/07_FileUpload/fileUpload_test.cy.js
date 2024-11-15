/// <reference types="cypress" />
///
const button_fontColor = "rgb(255, 255, 255)"; //white;
const button_backGroundColor = "rgb(51, 51, 51)"; //dark-grey;
const errorMessage_color = "rgb(255, 0, 0)"; // red
//
describe("Fileupload functionality test", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/practice-file-upload");
    cy.url().should("include", "file-upload");
    // Error div not exist
    cy.get(".error-message").should("not.exist");
  });
  //
  it("Error. should show message form submission if no file is uploaded or click submit without selecting", () => {
    cy.get("form").within(() => {
      cy.get('button[type="submit"]').click();
    });

    // Input file have no files.
    cy.get('input[data-testid="file-input"]').then((input) => {
      const files = input[0].files;
      expect(files.length).to.equal(0);
    });

    // If validation fails, it should show message or block the process.
    cy.get(".error-message")
      .should("be.visible")
      .and("have.text", "Please select a file to upload.")
      .and("have.css", "color", errorMessage_color);
  });
  it("Fileupload function test", () => {
    // Import file to upload and prepare transfer.
    cy.fixture("testfile.txt").then((fileContent) => {
      const blob = new Blob([fileContent], { type: "text/plain" });
      const file = new File([blob], "testfile.txt", { type: "text/plain" });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);

      // Simulate the upload file process.
      cy.get('input[data-testid="file-input"]').then((input) => {
        input[0].files = dataTransfer.files;
        cy.wrap(input).trigger("change", { force: true });
      });

      // Test if file "testfile.txt" is loaded correctly
      cy.get('input[data-testid="file-input"]').then((input) => {
        const files = input[0].files;
        expect(files.length).to.equal(1);
        expect(files[0].name).to.equal("testfile.txt");
      });

      // Intercept alert! needs to intercept pre-submit.
      cy.window().then((win) => {
        cy.stub(win, "alert").as("alert");
      });

      // Submit
      cy.get('button[type="submit"]').click();

      // Test alert intercepted and compare.
      cy.get("@alert").should("be.calledWith", "File successfully uploaded!");
    });
  });
});
