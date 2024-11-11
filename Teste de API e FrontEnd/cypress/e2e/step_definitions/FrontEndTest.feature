Feature: Teste FrontEnd

Scenario: Submeter formulário
    Given Que escolho a opção Forms e Practice Form
    When Preencher todo o formulário e submeter
    Then Deve aparecer um popup com o seguinte texto - Thanks for submitting the form

Scenario: Abrir e fechar nova janela
    Given Que escolho a opção Alerts, Frame & Windows e Browser Windows
    When Clicar no botão New Window
    Then Deve aparecer uma nova janela com a mensagem - This is a sample page

Scenario: Criação de Registro
    Given Que escolho a opção Elements e Web Tables
    When Criar um novo registro
    Then Deve aparecer o novo registro na página

Scenario: Edição de Registro
    Given Que escolho a opção Elements e Web Tables no demoqa
    When Edito um registro
    Then Deve aparecer o novo registro editado corretamente na página

Scenario: Exclusão de Registro
    Given Que um registro foi criado com sucesso
    When Excluo o registro
    Then O registro deve ser excluido com exito da página Web Tables

Scenario: Criação e exclusão de 12 Registros
    Given Que escolho a opção Elements e Web Tables
    When Criarmos 12 novos registros
        | FirstName | LastName | Email | Age | Salary | Department |
        | ana | Mendonça | ana@gmail.com | 14 | 1000 | teste |
        | Beatriz | Mendonça | beatriz@gmail.com | 22 | 5500 | teste |
        | Thays | Mendonça | thays@gmail.com | 24 | 800 | teste |
        | Jean | Mendonça | jean@gmail.com | 33 | 10000 | teste |
        | Leandro | Mendonça | leandro@gmail.com | 88 | 1500 | teste |
        | Fabiana | Mendonça | fabiana@gmail.com | 19 | 2000 | teste |
        | Juliana | Mendonça | juliana@gmail.com | 12 | 0 | teste |
        | Gusavo | Mendonça | gustavo@gmail.com | 38 | 3342 | teste |
        | João | Mendonça | joao@gmail.com | 22 | 5500 | teste |
        | Marcos | Mendonça | marcos@gmail.com | 33 | 1234 | teste |
        | Caio | Mendonça | caio@gmail.com | 52 | 4321 | teste |
        | Guilherme | Mendonça | guilherme@gmail.com | 6789 | 33 | teste |
    Then Devo apagar os 12 registros criados

Scenario: Progress Bar
    Given Que escolho a opção Widgets e Progress Bar
    When Clicar no botão start, parar antes dos 25%, validar que o valor da Progress Bar é menor ou igual a 25%, apertar start novamente e ao chegar aos 100% resetar a progress Bar
    Then Devo ser informado que a Progress Bar foi resetada com sucesso

Scenario: Sortable
    Given Que escolho a opção Interactions e Sortable
    When Colocar os elementos na ordem decrescente
    Then Devo poder visualizar todos os números na ordem decrescente