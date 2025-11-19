export const usuariosElements = {
  //Barra de navegação
  menuHome: '[data-testid="home"]',
  menuCadastrarUsuarios: 'a[href="/admin/cadastrarusuarios"]',
  menuListaUsuarios: 'a[href="/admin/listarusuarios"]',
  //Botões de funcionalidades na tela Home
  botaoCadastrarUsuarios: '[data-testid="cadastrarUsuarios"]',
  botaoListarUsuarios: '[data-testid="listarUsuarios"]',
  //Funcionalidades da tela de cadastro de usuário
  tituloCadastroUsuarios: 'form h1',
  inputNomeUsuario: '#nome',
  inputEmailUsuario: '#email',
  inputSenhaUsuario: '#password',
  checkboxAdmin: '#administrador',
  botaoCadastrarUsuario: 'form button[type="submit"]',
  //Mensagens de erro/sucesso na tela de cadastro de usuário
  mensagemSucessoCadastroUsuario: 'form .alert-success',
  mensagemNomeObrigatorio: 'form div:nth-child(3)',
  mensagemEmailObrigatorio: 'form div:nth-child(4)',
  mensagemSenhaObrigatoria: 'form div:nth-child(5)',
  mensagemSucessoCadastroUsuario: 'form .alert.alert-success',
  mensagensErrosCadastroUsuario: 'form .alert.alert-secondary.alert-dismissible',
  //Funcionalidades da tela de lista de usuários
  tituloListaUsuarios: 'h1',
  tabelaUsuarios: 'table tbody',
  linhaUsuario: 'table tbody tr',
  celulaEmailUsuario: 'td:nth-child(3)',
  botaoExcluirUsuarioNaLinha: 'button.btn-danger',
}

