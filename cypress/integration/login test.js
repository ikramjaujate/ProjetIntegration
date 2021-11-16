describe("Tests pour la connexion", () => {
    
    before(() => {
        cy.visit("projet.4x4vert.be/login");
        cy.get('input').get('#exampleInputEmail1').type('admin')
        cy.get('input').get('#exampleInputPassword1').type('123')
        cy.contains('button','Connecter').click()
        
        cy.wait(1000)
        //cy.visit("projet.4x4vert.be/modification");
        Cypress.Cookies.preserveOnce(localStorage.access_token)
    });

    beforeEach(() => {
        // before each test, we can automatically preserve the
        // 'session_id' and 'remember_token' cookies. this means they
        // will not be cleared before the NEXT test starts.
        //
        // the name of your cookies will likely be different
        // this is an example
        Cypress.Cookies.preserveOnce(localStorage.access_token)
      })
    /*it("camera", () => {
        
        cy.visit("projet.4x4vert.be/camera");
        cy.get('h3')
        cy.contains('Camera')
    });*/

})

describe("cam", () => {
    
   
    it("camera", () => {
        
        cy.visit("projet.4x4vert.be/camera");
        cy.get('h3')
        cy.contains('Camera')
    });

})

