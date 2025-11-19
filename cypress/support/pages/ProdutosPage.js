import { produtosElements } from '../elements/produtosElements'
import mensagens from '../../fixtures/mensagens.json'

class ProdutosPage {
    // Navegação
    acessarHomePeloMenu() {
        cy.get(produtosElements.menuHome).click()
    }

    acessarCadastroProdutosPeloMenu() {
        cy.contains(produtosElements.menuLinks, 'Cadastrar Produtos').click()
    }

    acessarListaProdutosPeloMenu() {
        cy.contains(produtosElements.menuLinks, 'Listar Produtos').click()
    }

    acessarRelatoriosPeloMenu() {
        cy.contains(produtosElements.menuLinks, 'Relatórios').click()
    }

    acessarCadastroProdutosPeloBotaoHome() {
        cy.contains(produtosElements.cardHome, 'Cadastrar Produto')
            .find('a')
            .click()
    }

    acessarListaProdutosPeloBotaoHome() {
        cy.contains(produtosElements.cardHome, 'Listar Produtos')
            .find('a')
            .click()
    }

    acessarRelatoriosPeloBotaoHome() {
        cy.contains(produtosElements.cardHome, 'Relatórios')
            .find('a')
            .click()
    }

    validarTelaCadastroProdutos() {
        cy.get(produtosElements.tituloCadastroProdutos)
            .should('be.visible')
            .and('contain', mensagens.produtos.tituloCadastro)
    }

    validarTelaListaProdutos() {
        cy.get(produtosElements.tituloListaProdutos)
            .should('be.visible')
            .and('contain', mensagens.produtos.tituloLista)
    }

    validarTelaRelatorios() {
        cy.get(produtosElements.tituloRelatorios)
            .should('be.visible')
            .and('contain', 'Em construção aguarde')
    }

    // Formulário de cadastro de produtos
    preencherNomeProduto(nome) {
        cy.get(produtosElements.inputNomeProduto).clear()

        if (nome) {
            cy.get(produtosElements.inputNomeProduto).type(nome)
        }
    }

    preencherPrecoProduto(preco) {
        cy.get(produtosElements.inputPrecoProduto).clear()

        if (preco) {
            cy.get(produtosElements.inputPrecoProduto).type(preco)
        }
    }

    preencherDescricaoProduto(descricao) {
        cy.get(produtosElements.inputDescricaoProduto).clear()

        if (descricao) {
            cy.get(produtosElements.inputDescricaoProduto).type(descricao)
        }
    }

    preencherQuantidadeProduto(quantidade) {
        cy.get(produtosElements.inputQuantidadeProduto).clear()

        if (quantidade) {
            cy.get(produtosElements.inputQuantidadeProduto).type(quantidade)
        }
    }

    selecionarImagemProduto(arquivo = 'produto.png') {
        cy.get(produtosElements.inputImagemProduto)
            .selectFile(`cypress/fixtures/${arquivo}`, { force: true })
    }
    clicarCadastrarProduto() {
        cy.get(produtosElements.botaoCadastrarProduto).click({ force: true })
    }

    validarSucessoCadastroProduto(texto = mensagens.produtos.sucessoCadastro) {
        cy.get(produtosElements.mensagemSucessoCadastroProduto)
            .should('be.visible')
            .and('contain', texto)
    }

    // Lista de produtos
    validarProdutoNaListaPorNome(nomeProduto) {
        cy.get(produtosElements.tabelaProdutos)
            .contains('td', nomeProduto)
            .should('be.visible')
    }
}

export default new ProdutosPage()
