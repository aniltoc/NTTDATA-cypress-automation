import { storeElements } from '../elements/storeElements'

class StorePage {
    // Home da Store
    validarHomeStore() {
        cy.get(storeElements.tituloServerestStore)
            .should('be.visible')
            .and('contain', 'Serverest Store')
    }

    pesquisarProduto(nomeProduto) {
        cy.get(storeElements.inputPesquisaProdutos).clear().type(nomeProduto)
        cy.contains('button', 'Pesquisar').click()
    }

    adicionarPrimeiroProdutoDaHomeNaLista() {
        cy.contains(storeElements.cardProduto, 'Adicionar a lista')
            .find('button')
            .contains('Adicionar a lista')
            .click()
    }

    adicionarProdutoDaHomeNaListaPorNome(nomeProduto) {
        cy.contains(storeElements.cardProduto, nomeProduto)
            .within(() => {
                cy.contains('button', 'Adicionar a lista').click()
            })
    }

    acessarListaComprasPeloMenu() {
        cy.contains('a', 'Lista de Compras').click()
    }

    acessarCarrinhoPeloMenu() {
        cy.contains('a', 'Carrinho').click()
    }

    //Tela Lista de Compras
    validarListaComprasVazia() {
        cy.get(storeElements.tituloListaCompras)
            .should('be.visible')
            .and('contain', 'Lista de Compras')

        cy.contains('Seu carrinho está vazio').should('be.visible')
    }

    validarProdutoNaListaDeCompras(nomeProduto) {
        cy.contains(storeElements.cardProdutoListaCompras, nomeProduto)
            .should('be.visible')
    }

    adicionarProdutoDaListaNoCarrinho() {
        cy.contains('button', 'Adicionar no carrinho').click()
    }

    //Tela Carrinho
    validarTelaCarrinhoEmConstrucao() {
        cy.get(storeElements.tituloCarrinho)
            .should('be.visible')
            .and('contain', 'Em construção aguarde')
    }

    acessarDetalhesProdutoDaHome(nomeProduto) {
        cy.contains(storeElements.cardProduto, nomeProduto)
            .within(() => {
                cy.contains('Detalhes').click()
            })
    }

    // Tela detalhes do produto
    clicarEmDetalhesPorNome(nomeProduto) {
        cy.contains(storeElements.cardProduto, nomeProduto)
            .within(() => {
                cy.contains('Detalhes').click()
            })
    }

    validarInformacoesDetalhesProduto(nome, preco, quantidade, descricao) {
        // Valida o título principal H1
        cy.get(storeElements.tituloDetalhesProduto)
            .should('be.visible')
            .and('contain', 'Detalhes do produto')
        // Valida o nome do produto (
        cy.get(storeElements.nomeProdutoDetalhes)
            .should('be.visible')
            .and('contain', nome)
        // Valida bloco de informações
        cy.get(storeElements.blocoInformacoesProduto).should('be.visible')
        //Valida Preço
        cy.get(storeElements.precoProdutoDetalhes)
            .should('be.visible')
            .and('contain', `R$: ${preco}`)
        //Valida Quantidade
        cy.get(storeElements.quantidadeProdutoDetalhes)
            .should('be.visible')
            .and('contain', `Quantidade: ${quantidade}`)
        // Valida Descrição
        cy.get(storeElements.descricaoProdutoDetalhes)
            .should('be.visible')
            .and('contain', descricao)
    }

    clicarEmDetalhesPorNome(nomeProduto) {
        cy.contains('.card', nomeProduto)
            .within(() => {
                cy.contains('Detalhes').click()
            })
    }

    clicarVoltarNosDetalhes() {
        cy.contains('a', 'Voltar').click()
    }

    adicionarProdutoDaTelaDetalhesNaLista() {
        cy.contains('button', 'Adicionar a lista').click()
    }
}

export default new StorePage()
