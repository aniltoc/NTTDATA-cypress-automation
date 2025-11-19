import LoginPage from '../../support/pages/LoginPage'
import UsuariosPage from '../../support/pages/UsuariosPage'
import { faker } from '@faker-js/faker'
import mensagens from '../../fixtures/mensagens.json'

describe('Gestão de Usuários (Cadastro, Lista e Exclusão)', () => {
    //Dados gerados dinamicamente (para cadastro/admin)
    const nomeAdmin = faker.person.fullName()
    const emailAdmin = faker.internet.email().toLowerCase()
    const senhaAdmin = faker.internet.password({ length: 8 })
    //Dados gerados para cadstro de usuário comum
    const nomeUsuarioComum = faker.person.fullName()
    const emailUsuarioComum = faker.internet.email()
    const senhaUsuarioComum = faker.internet.password()
    //Dados estáticos (para cenários de erro)
    const emailInvalido = 'emailinvalido@com'

    before(() => {
        LoginPage.criarUsuarioAdmin(nomeAdmin, emailAdmin, senhaAdmin)
        LoginPage.validarSucessoCadastro(mensagens.cadastro.sucesso)
        LoginPage.voltarParaLoginSePreciso()
    })

    beforeEach(() => {
        LoginPage.loginComAdmin(emailAdmin, senhaAdmin)
    })

    it('Validar o acesso das funcionalidades de cadastro e de lista de usuários pela barra de navegação e pelos botões na tela home', () => {
        //Acessando barra de navegação
        UsuariosPage.acessarCadastroUsuariosPeloMenu()
        UsuariosPage.validarTelaCadastroUsuarios()
        UsuariosPage.voltarParaHomePeloMenu()
        UsuariosPage.acessarListaUsuariosPeloMenu()
        UsuariosPage.validarTelaListaUsuarios()
        UsuariosPage.voltarParaHomePeloMenu()
        //Acessando pelos botões na tela home
        UsuariosPage.acessarCadastroUsuariosPeloBotao()
        UsuariosPage.validarTelaCadastroUsuarios()
        UsuariosPage.voltarParaHomePeloMenu()
        UsuariosPage.acessarListaUsuariosPeloBotao()
        UsuariosPage.validarTelaListaUsuarios()
    })

    it('Validar mensagens obrigatórias no cadastro de usuário', () => {
        UsuariosPage.acessarCadastroUsuariosPeloMenu()
        UsuariosPage.validarTelaCadastroUsuarios()
        //Tentativa de cadastro sem preencher nenhuma informação
        UsuariosPage.clicarCadastrarUsuario()
        UsuariosPage.validarErroNomeObrigatorio()
        UsuariosPage.validarErroEmailObrigatorio()
        UsuariosPage.validarErroSenhaObrigatoria()
        //Tentativa de cadastro com Email inválido   
        UsuariosPage.preencherNomeUsuario(nomeAdmin)
        UsuariosPage.preencherEmailUsuario(emailInvalido)
        UsuariosPage.preencherSenhaUsuario(senhaAdmin)
        UsuariosPage.clicarCadastrarUsuario()
        UsuariosPage.validarErroEmailInvalido(mensagens.cadastro.emailInvalidoCadastro)
        //Tentativa de cadastro com Email vazio 
        UsuariosPage.preencherNomeUsuario(nomeAdmin)
        UsuariosPage.preencherSenhaUsuario(senhaAdmin)
        UsuariosPage.preencherEmailUsuario('')
        UsuariosPage.clicarCadastrarUsuario()
        UsuariosPage.validarErroEmailEmBrancoCadastro(mensagens.cadastro.emailEmBrancoCadastro)
        //Tentativa de cadastro com Nome vazio 
        UsuariosPage.preencherEmailUsuario(emailAdmin)
        UsuariosPage.preencherSenhaUsuario(senhaAdmin)
        UsuariosPage.preencherNomeUsuario('')
        UsuariosPage.clicarCadastrarUsuario()
        UsuariosPage.validarErroNomeEmBrancoCadastro(mensagens.cadastro.nomeEmBrancoCadastro)
        //Tentativa de cadastro comSenha vazia
        UsuariosPage.preencherNomeUsuario(nomeAdmin)
        UsuariosPage.preencherEmailUsuario(emailAdmin)
        UsuariosPage.preencherSenhaUsuario('')
        UsuariosPage.clicarCadastrarUsuario()
        UsuariosPage.validarErroSenhaEmBrancoCadastro(mensagens.cadastro.senhaEmBrancoCadastro)
    })
    it('Deve cadastrar, listar e excluir um usuário comum', () => {
        //Realizar o cadastro do usuário comum
        UsuariosPage.acessarCadastroUsuariosPeloMenu()
        UsuariosPage.validarTelaCadastroUsuarios()
        UsuariosPage.preencherNomeUsuario(nomeUsuarioComum)
        UsuariosPage.preencherEmailUsuario(emailUsuarioComum)
        UsuariosPage.preencherSenhaUsuario(senhaUsuarioComum)
        //Finalizar o cadastro
        UsuariosPage.clicarCadastrarUsuario()
        //Acessando a lista de usuários para validar o cadastro
        UsuariosPage.acessarListaUsuariosPeloMenu()
        UsuariosPage.validarTelaListaUsuarios()
        UsuariosPage.validarBotaoEditar()
        UsuariosPage.validarUsuarioNaListaPorEmail(emailUsuarioComum)
        //Excluir o usuário cadastrado
        UsuariosPage.excluirUsuarioPorEmail(emailUsuarioComum)
        UsuariosPage.validarUsuarioNaoExisteMaisNaLista(emailUsuarioComum)
    })
})