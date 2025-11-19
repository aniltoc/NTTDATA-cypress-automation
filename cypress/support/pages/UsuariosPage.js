import { usuariosElements } from '../elements/usuariosElements'
import mensagens from '../../fixtures/mensagens.json'

class UsuariosPage {
  //Navegação

  voltarParaHomePeloMenu() {
    cy.get(usuariosElements.menuHome).click()
  }

  acessarCadastroUsuariosPeloMenu() {
    cy.contains('nav a', 'Cadastrar Usuários').click()
  }

  acessarCadastroUsuariosPeloBotao() {
    cy.contains('nav a', 'Cadastrar').click()
  }

  acessarListaUsuariosPeloMenu() {
    cy.contains('nav a', 'Listar Usuários').click()
  }

  acessarListaUsuariosPeloBotao() {
    cy.contains('nav a', 'Listar').click()
  }

  validarTelaCadastroUsuarios() {
    cy.get(usuariosElements.tituloCadastroUsuarios)
      .should('be.visible').contains('Cadastro de usuários')
  }

  validarTelaListaUsuarios() {
    cy.get(usuariosElements.tituloListaUsuarios)
      .should('be.visible').contains('Lista dos usuários')
  }

  //Tela de Cadastro de usuário
  preencherNomeUsuario(nome) {
    cy.get(usuariosElements.inputNomeUsuario).clear()

    if (nome) {
      cy.get(usuariosElements.inputNomeUsuario).type(nome)
    }
  }

  preencherEmailUsuario(email) {
    cy.get(usuariosElements.inputEmailUsuario).clear()

    if (email) {
      cy.get(usuariosElements.inputEmailUsuario).type(email)
    }
  }

  limparEmailCadastro() {
    cy.get(usuariosElements.inputEmailUsuario).clear()
  }

  preencherSenhaUsuario(senha) {
    cy.get(usuariosElements.inputSenhaUsuario).clear()

    if (senha) {
      cy.get(usuariosElements.inputSenhaUsuario).type(senha)
    }
  }

  marcarUsuarioComoAdmin() {
    cy.get(usuariosElements.checkboxAdmin).check({ force: true })
  }

  clicarCadastrarUsuario() {
    cy.get(usuariosElements.botaoCadastrarUsuario).click({ force: true })
  }

  validarErroNomeObrigatorio() {
    cy.contains(
      usuariosElements.mensagensErrosCadastroUsuario,
      mensagens.cadastro.nomeObrigatorioCadastro
    ).should('be.visible')
  }

  validarErroEmailObrigatorio() {
    cy.contains(
      usuariosElements.mensagensErrosCadastroUsuario,
      mensagens.cadastro.emailObrigatorioCadastro
    ).should('be.visible')
  }

  validarErroSenhaObrigatoria() {
    cy.contains(
      usuariosElements.mensagensErrosCadastroUsuario,
      mensagens.cadastro.senhaObrigatoriaCadastro
    ).should('be.visible')
  }

  validarErroEmailInvalido() {
    cy.contains(
      usuariosElements.mensagensErrosCadastroUsuario,
      mensagens.cadastro.emailInvalidoCadastro
    ).should('be.visible')
  }

  validarSucessoCadastroUsuario(texto) {
    cy.get(usuariosElements.mensagemSucessoCadastroUsuario)
      .should('contain', texto)
  }

  validarErroNomeEmBrancoCadastro() {
    cy.contains(
      usuariosElements.mensagensErrosCadastroUsuario,
      mensagens.cadastro.nomeEmBrancoCadastro
    ).should('be.visible')
  }

  validarErroEmailEmBrancoCadastro() {
    cy.contains(
      usuariosElements.mensagensErrosCadastroUsuario,
      mensagens.cadastro.emailEmBrancoCadastro
    ).should('be.visible')
  }

  validarErroSenhaEmBrancoCadastro() {
    cy.contains(
      usuariosElements.mensagensErrosCadastroUsuario,
      mensagens.cadastro.senhaEmBrancoCadastro
    ).should('be.visible')
  }

  // Tela Lista de usuários

  validarUsuarioNaListaPorEmail(email) {
    cy.get(usuariosElements.tabelaUsuarios)
      .contains('td', email)
      .should('be.visible')
  }

  excluirUsuarioPorEmail(email) {
    cy.get(usuariosElements.tabelaUsuarios)
      .contains('td', email)
      .parent('tr')
      .within(() => {
        cy.get(usuariosElements.botaoExcluirUsuarioNaLinha)
          .click({ force: true })
      })
  }

  validarBotaoEditar() {
    cy.get('table tbody')
      .find('button.btn.btn-info')
      .should('be.visible')
  }

  validarUsuarioNaoExisteMaisNaLista(email) {
    cy.get(usuariosElements.tabelaUsuarios)
      .should('not.contain', email)
  }
}

export default new UsuariosPage()