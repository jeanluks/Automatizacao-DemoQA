import teste from '../../../support/Pages/index'
import {Before, Given, When, Then} from 'cypress-cucumber-preprocessor/steps'
Cypress.on('uncaught:exception', () => false)

    Before(() => {
        teste.AcessarDemoQA()
    })

    //Pratice Form
    Given("Que escolho a opção Forms e Practice Form", () => {
        teste.DirecionarPraticeForm()
    })

    When("Preencher todo o formulário e submeter", () =>{
        teste.PreencherFormulario()
    })

    Then("Deve aparecer um popup com o seguinte texto - Thanks for submitting the form", () => {
        teste.TextoPopUp()
    })

    //New Windows
    Given("Que escolho a opção Alerts, Frame & Windows e Browser Windows", () => {
        teste.DerecionarBrowserWindows()
    })

    When("Clicar no botão New Window", () => {
        teste.NewWindow()
    })

    Then("Deve aparecer uma nova janela com a mensagem - This is a sample page", () => {
        teste.ConfirmarTextoNewWindow()
    })

    //Criação, edição, exclusão de Registros
    Given("Que escolho a opção Elements e Web Tables", () => {
        teste.DirecionarWebTables()
    })

    When("Criar um novo registro", () => {
        teste.NovoRegistro()
    })

    Then("Deve aparecer o novo registro na página", () => {
        teste.ConfirmacaoNovoRegistro()
    })

    Given("Que escolho a opção Elements e Web Tables no demoqa", () => {
        teste.DirecionarWebTables()
    })

    When("Edito um registro", () => {
        teste.NovoRegistro()
        teste.EditarRegistro()
    })

    Then("Deve aparecer o novo registro editado corretamente na página", () => {
        teste.ConfirmacaoRegistroEditado()
    })

    Given("Que um registro foi criado com sucesso", () => {
        teste.DirecionarWebTables()
        teste.NovoRegistro()
    })

    When("Excluo o registro", () => {
        teste.ExcluirRegistro()
    })

    Then("O registro deve ser excluido com exito da página Web Tables", () => {
        teste.ConfirmacaoRegistroExcluido()
    })

    Given("Que escolho a opção Elements e Web Tables", () => {
        teste.DirecionarWebTables()
    })

    When("Criarmos 12 novos registros", (datatable) => {
        teste.CriarRegistrosDinamico(datatable)
    })

    Then("Devo apagar os 12 registros criados", () => {
        teste.ApagarRegistrosDinamico()
    })

    //Progress Bar
    Given("Que escolho a opção Widgets e Progress Bar", () => {
        teste.DirecionarProgressBar()
    })

    When("Clicar no botão start, parar antes dos 25%, validar que o valor da Progress Bar é menor ou igual a 25%, apertar start novamente e ao chegar aos 100% resetar a progress Bar", () => {
        teste.ProgressBar()
    })

    Then("Devo ser informado que a Progress Bar foi resetada com sucesso", () => {
        teste.ProgressBarResetado()
    })

    //Drag e Drop em ordem Decrescente
    Given("Que escolho a opção Interactions e Sortable", () => {
        teste.DirecionarSortable()
    })

    When("Colocar os elementos na ordem decrescente", () => {
        teste.DragDrop()
    })

    Then("Devo poder visualizar todos os números na ordem decrescente", () => {
        teste.OrdemDecrescente() //Foi feito na ordem decrescente, pois na página ja se encontrava na ordem crescente
    })