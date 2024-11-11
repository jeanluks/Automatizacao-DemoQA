import {Before, When, Then, Given} from 'cypress-cucumber-preprocessor/steps'
Cypress.on('uncaught:exception', () => false)

const userName = `testname${Cypress._.random(0, 1e6)}`;
let userID;
let token;

before(() => {
    
    //Criação de usuário
    cy.request({
      method: 'POST',
      url:'https://demoqa.com/Account/v1/User',
      body:{
        "userName": userName,
        "password": "aB@12345"
      }}).then((response)=>{
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('userID');
        userID = response.body.userID;
        expect(response.body).to.have.property('username', userName);
  })

  //Token de acesso
  cy.request({
    method: 'POST',
    url:'https://demoqa.com/Account/v1/GenerateToken',
    body:{
      "userName": userName,
      "password": "aB@12345"
    }}).then((response)=>{
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
      token = response.body.token;
      expect(response.body).to.have.property('expires');
      expect(response.body).to.have.property('status', 'Success');
      expect(response.body).to.have.property('result', 'User authorized successfully.');
})

  })

  //Verificação de Token
  When("Rodarmos a requisição de confirmação do token", () => {
    cy.request({
        method: 'POST',
        url:'https://demoqa.com/Account/v1/Authorized',
        body:{
          "userName": userName,
          "password": "aB@12345"
        }}).as('confirToken')
  })

  Then("É esperado que retorne sucesso na requisição e o body de resposta retorne true", () => {
    cy.get('@confirToken').then((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body).to.eq(true);
  })
  })

  //Livros disponíveis para aluguel
  When("Rodarmos a requisiçao de listar os livros disponiveis", () => {
    cy.request({
        method: 'GET',
        url:'https://demoqa.com/BookStore/v1/Books',
      }).as('listarLivros')
  })

  Then("É esperado que retorne sucesso na requisição e retorne uma lista com todos os livros disponiveis e as suas informações", () => {
    cy.get('@listarLivros').then((response)=>{
        expect(response.status).to.eq(200);
  })
  })

  //Alugar Livros
  When("Rodarmos a requisição de alugar livros", () => {
    cy.request({
        method: 'POST',
        url:'https://demoqa.com/BookStore/v1/Books',
        body: {
          "userId": userID,
          "collectionOfIsbns": [
            {
              "isbn": "9781449325862"
            },
            {
              "isbn": "9781449331818"
            }
          ]
        },
        headers:{
          'Authorization': `Bearer ${token}`
        }
      }).as('alugarLivros')
  })

  Then("É esperado que retorne sucesso na requisição e o body de resposta retorne os 2 codigos dos livros alugados", () => {
    cy.get('@alugarLivros').then((response)=>{
        expect(response.status).to.eq(201);
  })
  })

  //Livros alugados pelo usuário
  When("Rodarmos a requisição de listar os detalhes do usuário", () => {
    cy.request({
        method: 'GET',
        url: `https://demoqa.com/Account/v1/User/${userID}`,
        headers:{
          'Authorization': `Bearer ${token}`
        }
      }).as('detalhesUsuario')
  })

  Then("É esperado que retorne sucesso na requisição e o body de resposta retorne o seu UserID, UserName e os detalhes dos 2 livros", () => {
    cy.get('@detalhesUsuario').then((response)=>{
        expect(response.status).to.eq(200);
  })
  })