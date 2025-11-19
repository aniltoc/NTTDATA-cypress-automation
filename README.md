# NTT DATA – Projeto de automação de testes com Cypress

Projeto desenvolvido como parte de um desafio técnico para a NTT DATA, com foco em **automação de testes de Frontend e API** utilizando o [Cypress](https://www.cypress.io/).

A aplicação alvo é a **ServeRest**:

- Frontend: `https://front.serverest.dev`
- API: `https://serverest.dev`

---

## Objetivo

- Demonstrar domínio em **testes automatizados E2E** (frontend) e **testes de API**.
- Utilizar boas práticas de:
  - Page Object Model (POM)
  - Organização de pastas
  - Cenários positivos e negativos
  - Validação de regras de negócio
- Entregar um projeto organizado, escalável e profissional.

---

## Tecnologias utilizadas

- **Node.js** + **npm**
- **Cypress**
- **@faker-js/faker** (massa de dados dinâmica)
- **ServeRest** (API pública para estudos)
- **Git + GitHub**

---

# Principais conceitos aplicados

### Page Object Model (POM)
- `elements/` contém seletores.
- `pages/` contém ações e validações.
- `e2e/` contém apenas os cenários (bem limpos e legíveis).

### Testes de API com `cy.request`
- Sem interface gráfica
- Testes extremamente rápidos
- Cobertura completa das regras de negócio da ServeRest

### Massa de dados dinâmica
- `faker` evita conflitos de e-mails, nomes e produtos duplicados.

## Estrutura do projeto
> Estrutura simplificada:
NTTDATA-cypress-automation/
  cypress/
    e2e/
      api/
        carrinhos.api.cy.js
        usuarios.api.cy.js
        produtos.api.cy.js
        (eventuais cenários extras: carrinhos, fluxo de compra, etc.)
      frontend/
        login.cy.js
        usuarios.cy.js
        produtos.cy.js
    fixtures/
      mensagens.json
      produto.png
    support/
      e2e.js
      commands.js
      elements/
        loginElements.js
        usuariosElements.js
        produtosElements.js
        storeElements.js
      pages/
        LoginPage.js
        UsuariosPage.js
        ProdutosPage.js
        StorePage.js
  cypress.config.js
  package.json
  package-lock.json

  ## Como executar o projeto
  ## Clonar o repositório
 - git clone https://github.com/aniltoc/NTTDATA-cypress-automation.git
 - cd NTTDATA-cypress-automation
  ## Instalar dependências
 - npm install
## Rodar os testes via terminal (não precisa abrir o navegador)
- npx cypress run
## Rodar os testes com o browser de sua preferência
- npx cypress open
- Quando a janela do Cypress abrir:
  - Clique em E2E Testing
  - O Cypress mostrará os navegadores instalados (Chrome, Edge, Electron…)
  - Selecione o Chrome (ou outro navegador de sua preferência)
  - Depois clique no arquivo de teste que deseja executar
