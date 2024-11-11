const elem = require('./elements').ELEMENTS;

class teste{

    AcessarDemoQA(){
        cy.visit('https://demoqa.com/')
    }

    DirecionarPraticeForm(){
        cy.get('.category-cards > :nth-child(2)').click()
        cy.get(':nth-child(2) > .element-list > .menu-list > #item-0').click()
    }

    DerecionarBrowserWindows(){
        cy.window().then((win) => {
            cy.stub(win, 'open').callsFake((url) => {
                win.location.href = url
            }) //Para facilitar, ao invés de abrir uma nova janela, simulei como se estivesse abrindo uma nova guia
        })

        cy.get('.category-cards > :nth-child(3)').click()
        cy.get(':nth-child(3) > .element-list > .menu-list > #item-0').click()
    }

    DirecionarWebTables(){
        cy.get('.category-cards > :nth-child(1)').click()
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-3').click()
    }

    DirecionarProgressBar(){
        cy.get('.category-cards > :nth-child(4)').click()
        cy.get(':nth-child(4) > .element-list > .menu-list > #item-4').click()
    }

    DirecionarSortable(){
        cy.get('.category-cards > :nth-child(5)').click()
        cy.get(':nth-child(5) > .element-list > .menu-list > #item-0').click()
    }

    PreencherFormulario(){
        cy.get('#firstName').type('Maçã')
        cy.get('#lastName').type('Verde')
        cy.get('#userEmail').type('macaverde@gmail.com')
        cy.get('#gender-radio-1').click({force: true})
        cy.get('#userNumber').type('1234567890')
        cy.get('#dateOfBirthInput').click()
        cy.get('.react-datepicker__day--024').click()
        cy.get('.subjects-auto-complete__value-container').type('Teste')
        cy.get('#hobbies-checkbox-1').click({force: true})
        cy.get('#uploadPicture').selectFile('teste.txt')
        cy.get('#currentAddress').type('Rua do Teste')
        
        cy.get('#state > .css-yk16xz-control > .css-1wy0on6 > .css-tlfecz-indicatorContainer').click()
        cy.get('#react-select-3-option-0').click()
        cy.get('#city > .css-yk16xz-control > .css-1wy0on6 > .css-tlfecz-indicatorContainer').click()
        cy.get('#react-select-4-option-0').click()

        cy.get('#submit').click()
    }

    TextoPopUp(){
        cy.get('#example-modal-sizes-title-lg').should('contain', 'Thanks for submitting the form')
        cy.get('#closeLargeModal').click({force: true})
    }

    NewWindow(){
        cy.get('#windowButton').click()
    }

    ConfirmarTextoNewWindow(){
        cy.get('#sampleHeading').should('contain', 'This is a sample page') 
        cy.visit('https://demoqa.com/browser-windows') //simulando o fechamento da janela
        cy.get('.text-center').should('contain', 'Browser Windows')
    }

    NovoRegistro(){
        cy.get('#addNewRecordButton').click()
        cy.get('#firstName').type('Niko')
        cy.get('#lastName').type('Mendonça')
        cy.get('#userEmail').type('nikomendonca@gmail.com')
        cy.get('#age').type('1')
        cy.get('#salary').type('0')
        cy.get('#department').type('Dog')
        cy.get('#submit').click()
    }

    ConfirmacaoNovoRegistro(){
        cy.get(':nth-child(4) > .rt-tr > :nth-child(1)').should('contain', 'Niko')
    }

    EditarRegistro(){
        cy.get('#edit-record-4').click()
        cy.get('#firstName').clear().type('Nicolau')
        cy.get('#submit').click()
    }

    ConfirmacaoRegistroEditado(){
        cy.get(':nth-child(4) > .rt-tr > :nth-child(1)').should('contain', 'Nicolau')
    }

    ExcluirRegistro(){
        cy.get('#delete-record-4').click()
    }

    ConfirmacaoRegistroExcluido(){
        cy.get(':nth-child(4) > .rt-tr > :nth-child(1)').should('contain', '')
    }

    CriarRegistrosDinamico(datatable){
        datatable.hashes().forEach((i) => { //Tabela de registro dinamico no arquivo FrontEndTest.feature
            cy.get('#addNewRecordButton').click()
            cy.get('#firstName').type(i.FirstName)
            cy.get('#lastName').type(i.LastName)
            cy.get('#userEmail').type(i.Email)
            cy.get('#age').type(i.Age)
            cy.get('#salary').type(i.Salary)
            cy.get('#department').type(i.Department)
            cy.get('#submit').click()
        })
    }

    ApagarRegistrosDinamico(){
        for (let i = 4; i <= 15; i++) {
            cy.get(`#delete-record-${i}`).click(); //Apagando todos os regstros adicionados
        }
        cy.get(':nth-child(4) > .rt-tr > :nth-child(1)').should('contain', '')
    }

    ProgressBar(){
        cy.get('#startStopButton').click()
        cy.wait(1500) //após o clique, esperar 1,5 segundos para carregar a barra um pouco
        cy.get('#startStopButton').click()

        cy.get('div[role="progressbar"]').invoke('attr', 'aria-valuenow').then((valorInicial) => {
                
            let valorInicialNum = parseFloat(valorInicial)
            if (valorInicialNum <= 25) {
                cy.log('O valor é menor ou igual a 25%')
                cy.get('#startStopButton').click()
                cy.wait(20000) //Quando o valor for menor ou igual a 25%, esperar 20 segundos para que a barra chegue aos 100%
                cy.get('div[role="progressbar"]').invoke('attr', 'aria-valuenow').then((valorFinal) => {

                    let valorFinalNum = parseFloat(valorFinal)
                    if (valorFinalNum === 100){
                        cy.log('Valor igual a 100%, pode resetar a Progress bar')
                        cy.get('#resetButton').click({force: true})
                        
                        cy.get('div[role="progressbar"]').invoke('attr', 'aria-valuenow').then((valorReset) => {

                            let valorResetNum = parseFloat(valorReset)
                            if (valorResetNum === 0){
                                cy.log('Valor zerado')
                                
    
                            } else {
                                cy.log('valor diferente de 0, botão não foi resetado')
                            }
    
                        })


                    } else {
                        cy.log('O valor é menor que 100%.')
                    }

                })

            } else {
                cy.log('O valor é maior que 25% e o clique não será executado.')
            }
        })
    }

    ProgressBarResetado(){
        if(cy.get('#startStopButton').should('contain', 'Start')){
            cy.log('Progress Bar foi resetada com sucesso')
        }
    }

    DragDrop(){
        //Invertendo o 3 com o 4
        cy.get('.vertical-list-container > :nth-child(3)').trigger('mousedown', { which: 1 })
        cy.get('.vertical-list-container > :nth-child(4)').trigger('mousemove').trigger('mouseup', { force: true })

        //Colocando o número 1 na posição 6
        cy.get('.vertical-list-container > :nth-child(1)').trigger('mousedown', { which: 1 })
        cy.get('.vertical-list-container > :nth-child(6)').trigger('mousemove').trigger('mouseup', { force: true })

        //Colocando o número 6 na posição 1
        cy.get('.vertical-list-container > :nth-child(5)').trigger('mousedown', { which: 1 })
        cy.get('.vertical-list-container > :nth-child(1)').trigger('mousemove').trigger('mouseup', { force: true })

        //Colocando o número 5 na posição 2
        cy.get('.vertical-list-container > :nth-child(5)').trigger('mousedown', { which: 1 })
        cy.get('.vertical-list-container > :nth-child(2)').trigger('mousemove').trigger('mouseup', { force: true })

        //Colocando o número 2 na posição 5
        cy.get('.vertical-list-container > :nth-child(3)').trigger('mousedown', { which: 1 })
        cy.get('.vertical-list-container > :nth-child(5)').trigger('mousemove').trigger('mouseup', { force: true })
    }

    OrdemDecrescente(){ //Foi feito na ordem decrescente, pois na página ja se encontrava na ordem crescente
        cy.get('.vertical-list-container > :nth-child(1)').should('contain', 'Six')
        cy.get('.vertical-list-container > :nth-child(2)').should('contain', 'Five')
        cy.get('.vertical-list-container > :nth-child(3)').should('contain', 'Four')
        cy.get('.vertical-list-container > :nth-child(4)').should('contain', 'Three')
        cy.get('.vertical-list-container > :nth-child(5)').should('contain', 'Two')
        cy.get('.vertical-list-container > :nth-child(6)').should('contain', 'One')
    }
}

export default new teste();