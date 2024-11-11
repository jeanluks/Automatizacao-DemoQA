Feature: Teste de API

Scenario: Confirmar se o usuário criado está autorizado
    When Rodarmos a requisição de confirmação do token
    Then É esperado que retorne sucesso na requisição e o body de resposta retorne true

Scenario: Listar os livros disponíveis
    When Rodarmos a requisiçao de listar os livros disponiveis
    Then É esperado que retorne sucesso na requisição e retorne uma lista com todos os livros disponiveis e as suas informações

Scenario: Alugar dois livros de livre escolha
    When Rodarmos a requisição de alugar livros
    Then É esperado que retorne sucesso na requisição e o body de resposta retorne os 2 codigos dos livros alugados

Scenario: Listar os detalhes do usuário com os livros escolhidos
    When Rodarmos a requisição de listar os detalhes do usuário
    Then É esperado que retorne sucesso na requisição e o body de resposta retorne o seu UserID, UserName e os detalhes dos 2 livros