describe("Currency conversion journey", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    // Removing local storage between tests.
  });
  it("renders the correct currency conversion when a user selects a base currency and a target currency.", () => {
    cy.intercept(
      {
        method: "GET",
        url: /https:\/\/www\.floatrates\.com\/daily\/(USD|GBP)\.json/,
      },
      { fixture: "currency.json" }
    ).as("getRates");

    cy.visit("/");

    cy.wait(["@getRates"]);

    // check base currency is visible and set to USD
    cy.get('[data-testid="base-currency"]').should("exist");

    // get the dropdown and click it
    cy.get('[data-testid="currency-select"]').should("contain", "USD").click();

    // select the new base currency has been updated to GBP
    cy.get('[role="option"]').contains("GBP").click();
    cy.get('[data-testid="base-currency"]').should("contain", "£");

    // check input is 0 and that button is thus disabled
    cy.get('[data-testid="amount-input"]').should("have.value", "0");

    cy.get('button[data-testid="convert-button"]').as("convertButton");
    cy.get("@convertButton").should("have.attr", "disabled");

    // add a currency from the dropdown
    cy.contains("button", "Select a currency").as("dropdownButton");
    cy.get("@dropdownButton").click();
    cy.get('[role="option"]').contains("AUD").click();

    // enter a valid amount and click
    cy.get('[data-testid="amount-input"]').type("100");
    cy.get("@convertButton").click();

    cy.get('[data-testid="currency-card"]').should("contain.text", "150.00");
  });
});
