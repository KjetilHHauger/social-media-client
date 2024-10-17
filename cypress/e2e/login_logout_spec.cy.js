const url = 'http://127.0.0.1:8080/'; // add your url here.
const loginMailValid = 'demo@stud.noroff.no';
const loginPassValid = '123456789';
const loginMailInvalid = 'bigbird@stud.noroff.no';
const loginPassInvalid = 'yellowthing';

describe('Login functionality test', () => {
  it('checks that the user can log in with the login form with valid credentials', function () {
    cy.visit(url);
    cy.wait(500);
    cy.get('#registerForm > .modal-footer > .btn-outline-success').click();
    cy.get('#loginEmail').clear('d');
    cy.get('#loginEmail').type(loginMailValid, { force: true, delay: 35 });
    cy.get('#loginPassword').clear('1');
    cy.get('#loginPassword').type(loginPassValid, { force: true, delay: 35 });
    cy.get('#loginForm > .modal-footer > .btn-success').click();
  });
});
describe('Logout functionality test', () => {
  it('checks that the user can log out with the logout button', function () {
    cy.visit(url);
    cy.wait(500);
    cy.get('#registerForm > .modal-footer > .btn-outline-success').click();
    cy.get('#loginEmail').clear('d');
    cy.get('#loginEmail').type(loginMailValid, { force: true, delay: 35 });
    cy.get('#loginPassword').clear('1');
    cy.get('#loginPassword').type(loginPassValid, { force: true, delay: 35 });
    cy.get('#loginForm > .modal-footer > .btn-success').click();
    cy.get('.btn-outline-warning').click();
  });
});

describe('Invalid login functionality test', () => {
  it('checks that the user can log in with the login form with valid credentials', function () {
    cy.visit(url);
    cy.wait(500);
    cy.get('#registerForm > .modal-footer > .btn-outline-success').click();
    cy.get('#loginEmail').clear('d');
    cy.get('#loginEmail').type(loginMailInvalid, { force: true, delay: 35 });
    cy.get('#loginPassword').clear('1');
    cy.get('#loginPassword').type(loginPassInvalid, { force: true, delay: 35 });
    cy.get('#loginForm > .modal-footer > .btn-success').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal(
        'Either your username was not found or your password is incorrect'
      );
    });
  });
});
