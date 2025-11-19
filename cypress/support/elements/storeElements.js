export const storeElements = {
    //Topo da página
    tituloServerestStore: 'h1',

    //Busca pelos produtos
    inputPesquisaProdutos: 'input[placeholder="Pesquisar Produtos"]',
    botaoPesquisarProdutos: 'button[type="submit"], button:contains("Pesquisar")',

    //Cards de produto na Home
    cardProduto: 'div.card',
    botaoAdicionarListaCard: 'button', // vamos filtrar por texto na Page

    //Barra de navegação / Menu
    linkHome: 'a[href="/home"], a:contains("Home")',
    linkListaCompras: 'a:contains("Lista de Compras")',
    linkCarrinho: 'a:contains("Carrinho")',

    //Tela Lista de Compras
    tituloListaCompras: 'h1',
    mensagemCarrinhoVazio: 'h2, p', // vamos filtrar por texto
    cardProdutoListaCompras: 'div.card',
    botaoAdicionarNoCarrinho: 'button:contains("Adicionar no carrinho")',

    //Tela Carrinho
    tituloCarrinho: 'h1',

    // Tela de detalhes do produto
    tituloDetalhesProduto: 'h1',

    // Nome do produto nos detalhes
    nomeProdutoDetalhes: 'section .card-body h2',

    // Bloco que contém todas as infos (preço, quantidade, descrição)
    blocoInformacoesProduto: 'section .card-body .col-6',

    // Infos individuais
    precoProdutoDetalhes: 'section .card-body .col-6 h4:nth-child(2)',
    quantidadeProdutoDetalhes: 'section .card-body .col-6 h4:nth-child(3)',
    descricaoProdutoDetalhes: 'section .card-body .col-6 h4:nth-child(4)',
}
