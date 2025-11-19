export const loginElements = {
    // Tela de login
    logoTelaInicialLogin: 'form h1',
    inputEmail: '#email',
    inputSenha: '#password',
    botaoEntrar: 'form button[type="submit"]',
    bbotaoCadastrarUsuario: 'form button[type="submit"]',

    // Mensagens na tela de login
    mensagemEmailSenhaInvalido: 'form .alert',
    mensagemErroEmail: 'form div:nth-child(3)',
    mensagemErroEmailValidoLogin: 'form .alert',
    mensagemErroEmailInvalidoLogin: 'form .alert',
    mensagemErroSenha: 'form div:nth-child(4)',
    mensagemErroSenhaEmBranco: '#password-helper-text',
    mensagemErroEmailEmBranco: '#email-helper-text',
    mensagemCredenciaisInvalidasLogin: 'form .alert',

    // Tela de cadastro
    logoTelaInicialCadastro: 'form h2',
    botaoCadastrarse: 'form small a',
    botaoCadastrarUsuario: 'form button[type="submit"]',
    inputNomeCadastro: '#nome',
    inputEmailCadastro: '#email',
    inputSenhaCadastro: '#password',
    checkboxAdminCadastro: '#administrador',
    botaoVoltarLogin: 'form small a',

    // Mensagens na tela de cadastro
    mensagemSucessoCadastro: 'form > div:nth-child(3) > div',
    mensagemErroNomeObrigatorioCadastro: 'form div:nth-child(3)',
    mensagemErroEmailObrigatorioCadastro: 'form div:nth-child(4)',
    mensagemErroEmailValidoCadastro: 'form .alert.alert-secondary.alert-dismissible',
    mensagemErroSenhaObrigatoriaCadastro: 'form div:nth-child(5)',
    mensagemCampoEmBranco: 'form .alert.alert-secondary.alert-dismissible',
    mensagemEmailJaCadastrado: 'form .alert',

    // Tela após login (home)
    mensagemBemVindo: '#root > div > div > h1',
    // Tela login Usuário Comum (Store)
    mensagemServerestStore: '#root > div > div > h1',

    // Botão logout
    botaoLogout: '#navbarTogglerDemo01 > form > button',
}
