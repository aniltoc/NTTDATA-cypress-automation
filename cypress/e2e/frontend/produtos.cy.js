import ProdutosPage from '../../support/pages/ProdutosPage'
import LoginPage from '../../support/pages/LoginPage'
import StorePage from '../../support/pages/StorePage'
import { faker } from '@faker-js/faker'
import { produtosElements } from '../../support/elements/produtosElements'
import mensagens from '../../fixtures/mensagens.json'

describe('Gestão de produtos (cadastro, listagem, acesso a tela relatórios e fluxo de compra)', () => {
    const nomeProduto = `Produto ${faker.commerce.productName()}`
    const precoProduto = '100'
    const descricaoProduto = faker.commerce.productDescription()
    const quantidadeProduto = '10'
    //Dados gerados dinamicamente (para cadastro/admin)
    const nomeAdmin = faker.person.fullName()
    const emailAdmin = faker.internet.email().toLowerCase()
    const senhaAdmin = faker.internet.password({ length: 8 })

    before(() => {
        LoginPage.criarUsuarioAdmin(nomeAdmin, emailAdmin, senhaAdmin)
        LoginPage.validarSucessoCadastro(mensagens.cadastro.sucesso)
        LoginPage.voltarParaLoginSePreciso()
    })

    beforeEach(() => {
        LoginPage.acessarLogin()
    })

    it('Validar cadastro de produto, lista de produtos e acesso a tela de relatórios via menu e botões da Home', () => {
        LoginPage.loginComAdmin(emailAdmin, senhaAdmin)
        //Validando cadastro de produto
        ProdutosPage.acessarCadastroProdutosPeloMenu()
        ProdutosPage.validarTelaCadastroProdutos()
        ProdutosPage.preencherNomeProduto(nomeProduto)
        ProdutosPage.preencherPrecoProduto(precoProduto)
        ProdutosPage.preencherDescricaoProduto(descricaoProduto)
        ProdutosPage.preencherQuantidadeProduto(quantidadeProduto)
        ProdutosPage.selecionarImagemProduto()
        ProdutosPage.clicarCadastrarProduto()
        ProdutosPage.validarTelaListaProdutos()
        ProdutosPage.validarProdutoNaListaPorNome(nomeProduto)
        //Validando lista de produtos via menu e procurando pelo produto cadastrado
        ProdutosPage.acessarListaProdutosPeloMenu()
        ProdutosPage.validarTelaListaProdutos()
        ProdutosPage.validarProdutoNaListaPorNome(nomeProduto)
        //Validando acesso das telas via barra de navegação (menu) e botões da Home
        cy.get(produtosElements.menuHome).click()
        ProdutosPage.acessarCadastroProdutosPeloBotaoHome()
        ProdutosPage.validarTelaCadastroProdutos()
        cy.get(produtosElements.menuHome).click()
        ProdutosPage.acessarListaProdutosPeloBotaoHome()
        ProdutosPage.validarTelaListaProdutos()
        cy.get(produtosElements.menuHome).click()
        //Validando acesso a tela Relatórios via barra de navegação e botões da Home
        ProdutosPage.acessarRelatoriosPeloMenu()
        ProdutosPage.validarTelaRelatorios()
        cy.get(produtosElements.menuHome).click()
        ProdutosPage.acessarRelatoriosPeloBotaoHome()
        ProdutosPage.validarTelaRelatorios()
    })
    it('Validar que usuário comum pesquise o produto e adicione ao carrinho', () => {
        const nomeComum = faker.person.fullName()
        const emailComum = faker.internet.email().toLowerCase()
        const senhaComum = faker.internet.password({ length: 8 })
        //Validando a criação de usuário comum
        LoginPage.criarUsuarioComum(nomeComum, emailComum, senhaComum)
        LoginPage.validarSucessoCadastro(mensagens.cadastro.sucesso)
        LoginPage.voltarParaLoginSePreciso()
        //Validando login como usuário comum
        LoginPage.loginComUsuarioComum(emailComum, senhaComum)
        StorePage.validarHomeStore()
        //Validando a tela Lista de Compras vazia
        StorePage.acessarListaComprasPeloMenu()
        StorePage.validarListaComprasVazia()
        //Validando a volta pra home e a funcionalidade de pesquisa do produto
        cy.contains('a', 'Home').click()
        StorePage.pesquisarProduto(nomeProduto)
        //Validando o botão Detalhes
        StorePage.clicarEmDetalhesPorNome(nomeProduto)
        //Validando tela de detalhes
        StorePage.validarInformacoesDetalhesProduto(nomeProduto,precoProduto, quantidadeProduto,descricaoProduto)
        //Validando o botão Voltar em Detalhes
        StorePage.clicarVoltarNosDetalhes()
        //Validando Adicionar à lista
        StorePage.adicionarProdutoDaHomeNaListaPorNome(nomeProduto)
        //Validando na lista de compras
        StorePage.acessarListaComprasPeloMenu()
        StorePage.validarProdutoNaListaDeCompras(nomeProduto)
        //Validando adicionar ao carrinho
        StorePage.adicionarProdutoDaListaNoCarrinho()
        //Validando a tela carrinho
        StorePage.acessarCarrinhoPeloMenu()
        StorePage.validarTelaCarrinhoEmConstrucao()
    })
})