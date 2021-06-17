/* eslint-disable no-undef */


describe("Appointments", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");
  
    cy.contains("[data-testid=day]", "Monday");
  })

  it("should book an interview visit root", () => {

    cy.get("img.appointment__add-button").first()
    .click();

    cy.get("input.appointment__create-input")
    .type("Lydia Miller-Jones",{delay: 70});

    cy.get("[alt='Sylvia Palmer']")
    .click();
    
    cy.get("button.button--confirm")
    .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");

    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  it("should edit an interview", () => {

    cy.get("[alt='Edit']")
    .click({ force: true });

    cy.get("input.appointment__create-input")
    .clear()
    .type("vivi",{delay: 70});

    cy.get("[alt='Tori Malcolm']")
    .click();
    
    cy.get("button.button--confirm")
    .click();

    cy.contains(".appointment__card--show", "vivi");

    cy.contains(".appointment__card--show", "Tori Malcolm");

  });

  it("should cancel an interview", () => {

    cy.get("[alt='Delete']")
    .click({ force: true });

    
    cy.contains("Confirm")
    .click();

    cy.contains("Archie Cohen").should('not.exist');


  });


});