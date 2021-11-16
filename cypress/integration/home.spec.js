describe("Tests pour la connexion", () => {
    /*
    it("connexion", () => {
        cy.visit("projet.4x4vert.be/login");
        cy.get('input').get('#exampleInputEmail1').type('admin')
        cy.get('input').get('#exampleInputPassword1').type('123')
        cy.contains('button','Connecter').click()
        cy.wait(1000)
    });*/
})
describe("Tests pour la page grades", () => {
    let test = 'test3'

    it("Tests si la page d'accueil contient bien le react", () => {
        
        cy.visit("projet.4x4vert.be/login");
        cy.get('input').get('#exampleInputEmail1').type('admin')
        cy.get('input').get('#exampleInputPassword1').type('123')
        cy.contains('button','Connecter').click()
        cy.get('a[href=grades]').click()
        
        

    });
    it("Tests si la page d'accueil bien un titre", () => {
        cy.get('#title-description')
        cy.contains('Grades')
        
     
    });
    it("Tests si on peut rajouter un utilisateur qui existe déjà", () => {
        cy.get('#title-description')
        cy.contains('Grades')
        cy.get('#layout-add').click()
        cy.get('input').get('#name-grade').type('Directeur')
        cy.contains('button','Créer').click()
        cy.contains('div','Veuillez choisir une couleur')
        cy.contains('div','Ce nom existe déjà')     
        cy.get('#cancel-creation').click()
     
    });

    it("Tests si on peut rajouter un utilisateur qui n'existe pas, sans couleur", () => {
        cy.get('#title-description')
        cy.contains('Grades')
        cy.get('#layout-add').click()
        cy.get('input').get('#name-grade').type(test)
        cy.contains('button','Créer').click()
        cy.contains('div','Veuillez choisir une couleur')
    
     
    });
    /*
    // enlever les commmentaires lorsque la fonction supprimer grade existe
    it("Tests si on peut rajouter un utilisateur qui n'existe pas, avec couleur", () => {
        cy.contains('button','Créer').click()
        cy.contains('div','Veuillez choisir une couleur')
        cy.get('#little-square-4').click()
        cy.contains('button','Créer').click()
        cy.contains('div','Vous venez de créer le grade test3 !')
        cy.contains('div','test3')
     
    });*/

    it("Tests si on peut modifier un grade", () => {
        cy.get('#cancel-creation').click()
        cy.contains('div','Directeur').click()
        cy.wait(1000)
        cy.contains('button','Modifier').click()
        cy.get('[type="checkbox"]').get('.action-1-1').click()
        cy.contains('button','Enregistrer').click()
        cy.contains('div','Vous venez de modifier les actions des caméras du grade Directeur !')

     
    });

})

/*
describe("Tests pour la page camera", () => {
    
    it("Tests si la page camera contient bien le react", () => {
        cy.visit("projet.4x4vert.be/login");
        cy.get('input').get('#exampleInputEmail1').type('admin')
        cy.get('input').get('#exampleInputPassword1').type('123')
        cy.contains('button','Connecter').click()
        cy.get('a[href=camera]').click()

    });
    it("Tests si la page camera bien un titre", () => {
        //cy.visit("projet.4x4vert.be/camera");
        cy.get('h3')
        cy.contains('Camera')
        cy.contains('button','prend photo')
        cy.contains('button','up')
        cy.contains('button','Éteindre')
 
    });
    

})*/

describe("Tests pour la page accueil", () => {
    
    it("Tests si la page d'accueil contient bien le react", () => {
        cy.visit("projet.4x4vert.be/login");
        cy.get('input').get('#exampleInputEmail1').type('admin')
        cy.get('input').get('#exampleInputPassword1').type('123')
        cy.contains('button','Connecter').click()
        cy.get('a[href=home]').click()

    });
    it("Tests si la page d'accueil bien un titre et des caméra cliquable", () => {
        cy.get('div')
        cy.contains('Page de gestion des caméras')
        cy.get('div')
        //cy.get('input').get('#1').click()
        cy.contains('CAFET').click()
        
        //cy.get('button[aria-label="Close"]').click()
        
    });
    

})


describe("Tests pour la page membres", () => {
    
    it("Tests si la page membre contient bien le react", () => {
        cy.visit("projet.4x4vert.be/login");
        cy.get('input').get('#exampleInputEmail1').type('admin')
        cy.get('input').get('#exampleInputPassword1').type('123')
        cy.contains('button','Connecter').click()
        cy.get('a[href=members]').click()

    });
    it("Tests si la page membre bien un titre et une navbar", () => {
        cy.get('input[placeholder=chercher')
        
        
    });
    

})