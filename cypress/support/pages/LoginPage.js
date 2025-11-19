import { loginElements } from '../elements/loginElements'
import mensagens from '../../fixtures/mensagens.json'

class LoginPage {
    acessarLogin() {
        cy.visit('/')
    }

    acessarCadastro() {
        cy.visit('https://front.serverest.dev/cadastrarusuarios')
    }

    validarTelaLogin() {
        cy.get(loginElements.logoTelaInicialLogin).should('contain', 'Login')
    }

    preencherEmail(email) {
        cy.get(loginElements.inputEmail).clear().type(email)
    }

    preencherSenha(senha) {
        cy.get(loginElements.inputSenha).clear().type(senha)
    }

    clicarEntrar() {
        cy.get(loginElements.botaoEntrar).click({ force: true })
    }

    clicarCadastrarUsuario() {
        cy.get(loginElements.botaoCadastrarUsuario).click({ force: true })
    }

    validarErroEmailObrigatorio() {
        cy.get(loginElements.mensagemErroEmail).should('contain', mensagens.login.emailObrigatorio)
    }

    validarErroSenhaObrigatoria() {
        cy.get(loginElements.mensagemErroSenha).should('contain', mensagens.login.senhaObrigatoria)
    }

    validarErroGeral() {
        cy.get(loginElements.mensagemErroEmailInvalidoLogin).should('contain', mensagens.login.emailInvalido)
    }

    validarCredenciaisInvalidas() {
        cy.get(loginElements.mensagemCredenciaisInvalidasLogin).should('contain', mensagens.login.credenciaisInvalidas)
    }

    //Cadastro de Usuários
    validarTelaCadastro() {
        cy.get(loginElements.logoTelaInicialCadastro).should('contain', 'Cadastro')
    }

    clicarCadastrarSe() {
        cy.get(loginElements.botaoCadastrarse).click({ force: true })
    }

    preencherNomeCadastro(nome) {
        cy.get(loginElements.inputNomeCadastro).clear()

        if (nome) {
            cy.get(loginElements.inputNomeCadastro).type(nome)
        }
    }

    preencherEmailCadastro(email) {
        cy.get(loginElements.inputEmailCadastro).clear()

        if (email) {
            cy.get(loginElements.inputEmailCadastro).type(email)
        }
    }

    limparEmailCadastro() {
        cy.get(loginElements.inputEmailCadastro).clear()
    }

    preencherSenhaCadastro(senha) {
        cy.get(loginElements.inputSenhaCadastro).clear()

        if (senha) {
            cy.get(loginElements.inputSenhaCadastro).type(senha)
        }
    }

    marcarCadastrarComoAdmin() {
        cy.get(loginElements.checkboxAdminCadastro).check({ force: true })
    }

    // Validações de mensagens de erro do CADASTRO:
    validarErroNomeObrigatorioCadastro() {
        cy.get(loginElements.mensagemErroNomeObrigatorioCadastro).should('contain', mensagens.cadastro.nomeObrigatorioCadastro)
    }

    validarErroNomeEmBranco() {
        cy.get(loginElements.mensagemCampoEmBranco).should('contain', mensagens.cadastro.nomeEmBrancoCadastro)
    }

    validarErroEmailObrigatorioCadastro() {
        cy.get(loginElements.mensagemErroEmailObrigatorioCadastro).should('contain', mensagens.cadastro.emailObrigatorioCadastro)
    }

    validarErroSenhaObrigatoriaCadastro() {
        cy.get(loginElements.mensagemErroSenhaObrigatoriaCadastro).should('contain', mensagens.cadastro.senhaObrigatoriaCadastro)
    }

    validarErroSenhaEmBranco() {
        cy.get(loginElements.mensagemCampoEmBranco).should('contain', mensagens.cadastro.senhaEmBrancoCadastro)
    }

    validarMensagemErroEmailInvalidoCadastro() {
        cy.get(loginElements.mensagemErroEmailValidoCadastro).should('contain', mensagens.cadastro.emailInvalidoCadastro)
    }

    validarErroEmailEmBranco() {
        cy.get(loginElements.mensagemCampoEmBranco).should('contain', mensagens.cadastro.emailEmBrancoCadastro)
    }
    //Validação de sucesso
    validarSucessoCadastro() {
        cy.get(loginElements.mensagemSucessoCadastro).should('contain', mensagens.cadastro.sucessoCadastro)
    }
    //Voltando pra login
    voltarParaLoginSePreciso() {
        cy.get('body').then($body => {
            if ($body.find(loginElements.botaoVoltarLogin).length) {
                cy.get(loginElements.botaoVoltarLogin).click({ force: true })
            } else {
                cy.visit('/')
            }
        })
    }

    validarHomeCarregada() {
        cy.get(loginElements.mensagemBemVindo, { timeout: 10000 })
            .should('be.visible')
            .and('contain', 'Bem Vindo')
    }

    validarHomeCarregadaUsuarioComum() {
        cy.get(loginElements.mensagemServerestStore, { timeout: 10000 })
            .should('be.visible')
            .and('contain', 'Serverest Store')
    }

    clicarLogout() {
        cy.get(loginElements.botaoLogout).click({ force: true })
    }

    //Criando usuários e logins rápidos
    criarUsuarioAdmin(nome, email, senha) {
        this.acessarCadastro()
        this.preencherNomeCadastro(nome)
        this.preencherEmailCadastro(email)
        this.preencherSenhaCadastro(senha)
        this.marcarCadastrarComoAdmin()
        this.clicarCadastrarUsuario()
    }

    loginComAdmin(email, senha) {
        this.acessarLogin()
        this.preencherEmail(email)
        this.preencherSenha(senha)
        this.clicarEntrar()
        this.validarHomeCarregada()
    }

    criarUsuarioComum(nome, email, senha) {
        this.acessarCadastro()
        this.preencherNomeCadastro(nome)
        this.preencherEmailCadastro(email)
        this.preencherSenhaCadastro(senha)
        this.clicarCadastrarUsuario()
    }

    loginComUsuarioComum(email, senha) {
        this.acessarLogin()
        this.preencherEmail(email)
        this.preencherSenha(senha)
        this.clicarEntrar()
        this.validarHomeCarregadaUsuarioComum()
    }
}

export default new LoginPage()