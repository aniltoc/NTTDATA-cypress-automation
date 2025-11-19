import LoginPage from '../../support/pages/LoginPage'
import { faker } from '@faker-js/faker'
import mensagens from '../../fixtures/mensagens.json'


describe('Login e Cadastro pela tela inicial', () => {
    //Dados estáticos (para cenários de erro)
    const emailInvalido = 'emailinvalido@com'
    //Dados gerados dinamicamente (para cadastro/admin)
    const nomeUsuario = faker.person.fullName()
    const emailUsuario = faker.internet.email().toLowerCase()
    const senhaUsuario = faker.internet.password({ length: 8 })

    beforeEach(() => {
        LoginPage.acessarLogin()
    })

    it('Validar mensagens de erro no login', () => {
        //Tentativa de login sem email e sem senha
        LoginPage.validarTelaLogin()
        LoginPage.clicarEntrar()
        LoginPage.validarErroEmailObrigatorio(mensagens.login.emailObrigatorio)
        LoginPage.validarErroSenhaObrigatoria(mensagens.login.senhaObrigatoria)
        //Tentativa de login com apenas email preenchido e senha em branco
        LoginPage.preencherEmail(emailUsuario)
        LoginPage.clicarEntrar()
        LoginPage.validarErroSenhaObrigatoria(mensagens.login.senhaEmbranco)
        //Tentativa de login com apenas senha preenchida e email em branco
        LoginPage.acessarLogin()
        LoginPage.preencherSenha(senhaUsuario)
        LoginPage.clicarEntrar()
        LoginPage.validarErroEmailObrigatorio(mensagens.login.emailEmbranco)
        //Tentativa de login com email com formato inválido
        LoginPage.acessarLogin()
        LoginPage.preencherEmail(emailInvalido)
        LoginPage.preencherSenha(senhaUsuario)
        LoginPage.clicarEntrar()
        LoginPage.validarErroGeral(mensagens.login.emailInvalido)
        //Tenativa de login de um usuário não cadastrado
        LoginPage.acessarLogin()
        LoginPage.preencherEmail(emailUsuario)
        LoginPage.preencherSenha(senhaUsuario)
        LoginPage.clicarEntrar()
        LoginPage.validarCredenciaisInvalidas(mensagens.login.credenciaisInvalidas)
    })

    it('Validar mensagens de erro durante cadastro na tela inicial', () => {
        LoginPage.clicarCadastrarSe()
        LoginPage.validarTelaCadastro()
        //Validando os campos obrigatórios e suas mensagens de erro
        LoginPage.clicarCadastrarUsuario()
        LoginPage.validarErroNomeObrigatorioCadastro(mensagens.cadastro.nomeObrigatorio)
        LoginPage.validarErroEmailObrigatorioCadastro(mensagens.cadastro.emailObrigatorio)
        LoginPage.validarErroSenhaObrigatoriaCadastro(mensagens.cadastro.senhaObrigatoria)
        //Validando mensagem de erro email em branco
        LoginPage.preencherNomeCadastro(nomeUsuario)
        LoginPage.preencherSenhaCadastro(senhaUsuario)
        LoginPage.preencherEmailCadastro(emailUsuario)
        LoginPage.limparEmailCadastro()
        LoginPage.clicarCadastrarUsuario()
        LoginPage.validarErroEmailEmBranco(mensagens.cadastro.emailObrigatorio)
        //Validando mensagem de erro nome em branco
        LoginPage.preencherEmailCadastro(emailUsuario)
        LoginPage.preencherSenhaCadastro(senhaUsuario)
        LoginPage.preencherNomeCadastro()
        LoginPage.clicarCadastrarUsuario()
        LoginPage.validarErroNomeEmBranco(mensagens.cadastro.emailEmbranco)
        // Validando mensagem de erro senha em branco
        LoginPage.preencherNomeCadastro(nomeUsuario)
        LoginPage.preencherEmailCadastro(emailUsuario)
        LoginPage.preencherSenhaCadastro() // deixa em branco
        LoginPage.clicarCadastrarUsuario()
        LoginPage.validarErroSenhaEmBranco(mensagens.cadastro.mensagemCampoEmBranco)
        //Validando mensagem de erro email inválido
        LoginPage.preencherNomeCadastro(nomeUsuario)
        LoginPage.preencherEmailCadastro(emailInvalido)
        LoginPage.preencherSenhaCadastro(senhaUsuario)
        LoginPage.clicarCadastrarUsuario()
        LoginPage.validarMensagemErroEmailInvalidoCadastro(mensagens.cadastro.emailInvalido)
    })

    it('Validar o cadastrado de usuário administrador com sucesso e realizar o login', () => {
        //Cadastrando usuário administrador com sucesso
        LoginPage.criarUsuarioAdmin(nomeUsuario, emailUsuario, senhaUsuario)
        //Mensagem de sucesso de cadastro
        LoginPage.validarSucessoCadastro(mensagens.cadastro.sucesso)
        //Volta para tela de login
        LoginPage.voltarParaLoginSePreciso()
        //Realiza login com o usuário administrador cadastrado
        LoginPage.preencherEmail(emailUsuario)
        LoginPage.preencherSenha(senhaUsuario)
        LoginPage.clicarEntrar()
        //Valida home carregada
        LoginPage.validarHomeCarregada()
        //Valida logout
        LoginPage.clicarLogout()
    })
})