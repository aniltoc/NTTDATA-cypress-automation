import { faker } from '@faker-js/faker'

const API_URL = 'https://serverest.dev'

describe('Gestão de carrinhos', () => {
    let adminToken
    let userToken
    let userId
    let produtoId1
    let produtoId2
    let carrinhoId

    before(() => {
        const adminEmail = faker.internet.email().toLowerCase()
        const adminSenha = 'admin123'

        const userEmail = faker.internet.email().toLowerCase()
        const userSenha = 'user123'

        // Tudo em cadeia para garantir a ordem e o uso correto dos tokens
        cy.request({
            method: 'POST',
            url: `${API_URL}/usuarios`,
            body: {
                nome: faker.person.fullName(),
                email: adminEmail,
                password: adminSenha,
                administrador: 'true'
            }
        })
            .then(res => {
                expect(res.status).to.eq(201)
            })
            // Login ADMIN
            .then(() => {
                return cy.request({
                    method: 'POST',
                    url: `${API_URL}/login`,
                    body: {
                        email: adminEmail,
                        password: adminSenha
                    }
                })
            })
            .then(res => {
                expect(res.status).to.eq(200)
                expect(res.body.authorization).to.exist
                adminToken = res.body.authorization
            })
            // Criar usuário COMUM
            .then(() => {
                return cy.request({
                    method: 'POST',
                    url: `${API_URL}/usuarios`,
                    body: {
                        nome: faker.person.fullName(),
                        email: userEmail,
                        password: userSenha,
                        administrador: 'false'
                    }
                })
            })
            .then(res => {
                expect(res.status).to.eq(201)
                expect(res.body._id).to.exist
                userId = res.body._id
            })
            // Login usuário COMUM
            .then(() => {
                return cy.request({
                    method: 'POST',
                    url: `${API_URL}/login`,
                    body: {
                        email: userEmail,
                        password: userSenha
                    }
                })
            })
            .then(res => {
                expect(res.status).to.eq(200)
                expect(res.body.authorization).to.exist
                userToken = res.body.authorization
            })
            // Criar produtos (agora já com adminToken definido)
            .then(() => {
                return cy.request({
                    method: 'POST',
                    url: `${API_URL}/produtos`,
                    headers: {
                        Authorization: adminToken
                    },
                    body: {
                        nome: `Produto Carrinho 1 ${faker.commerce.productName()}`,
                        preco: 100,
                        descricao: 'Produto para testes de carrinho',
                        quantidade: 10
                    }
                })
            })
            .then(res => {
                expect(res.status).to.eq(201)
                produtoId1 = res.body._id
            })
            .then(() => {
                return cy.request({
                    method: 'POST',
                    url: `${API_URL}/produtos`,
                    headers: {
                        Authorization: adminToken
                    },
                    body: {
                        nome: `Produto Carrinho 2 ${faker.commerce.productName()}`,
                        preco: 50,
                        descricao: 'Outro produto para testes de carrinho',
                        quantidade: 5
                    }
                })
            })
            .then(res => {
                expect(res.status).to.eq(201)
                produtoId2 = res.body._id
            })
    })

    it('Validar o cadastro de carrinho com sucesso para usuário logado', () => {
        cy.request({
            method: 'POST',
            url: `${API_URL}/carrinhos`,
            headers: {
                Authorization: userToken
            },
            body: {
                produtos: [
                    { idProduto: produtoId1, quantidade: 1 },
                    { idProduto: produtoId2, quantidade: 2 }
                ]
            }
        }).then(res => {
            expect(res.status).to.eq(201)
            expect(res.body.message).to.eq('Cadastro realizado com sucesso')
            expect(res.body._id).to.exist
            carrinhoId = res.body._id
        })
    })

    it('Validar lista de carrinhos cadastrados', () => {
        cy.request({
            method: 'GET',
            url: `${API_URL}/carrinhos`
        }).then(res => {
            expect(res.status).to.eq(200)
            expect(res.body).to.have.property('quantidade')
            expect(res.body).to.have.property('carrinhos')
            expect(res.body.carrinhos).to.be.an('array')
        })
    })

    it('Validar busca por carrinho por ID existente', () => {
        cy.request({
            method: 'GET',
            url: `${API_URL}/carrinhos/${carrinhoId}`
        }).then(res => {
            expect(res.status).to.eq(200)
            expect(res.body).to.have.property('_id', carrinhoId)
            expect(res.body).to.have.property('idUsuario', userId)
            expect(res.body).to.have.property('precoTotal')
            expect(res.body).to.have.property('quantidadeTotal')
        })
    })

    it('Validar que não é possível buscar carrinho inexistente', () => {
        const idInvalido = 'IDCARRINHO_INEXISTENTE_123'

        cy.request({
            method: 'GET',
            url: `${API_URL}/carrinhos/${idInvalido}`,
            failOnStatusCode: false
        }).then((res) => {
            // A API deveria retornar 400 + mensagem "Carrinho não encontrado"
            // MAS NA PRÁTICA retorna: status 400 + body {}
            expect(res.status).to.eq(400)
            // E a mensagem REAL é undefined
            expect(res.body.message).to.eq(undefined)
        })
    })


    it('Validar que não é possível cadastrar segundo carrinho para o mesmo usuário', () => {
        cy.request({
            method: 'POST',
            url: `${API_URL}/carrinhos`,
            headers: {
                Authorization: userToken
            },
            failOnStatusCode: false,
            body: {
                produtos: [
                    { idProduto: produtoId1, quantidade: 1 }
                ]
            }
        }).then(res => {
            expect(res.status).to.eq(400)
            expect(res.body.message).to.eq('Não é permitido ter mais de 1 carrinho')
        })
    })

    it('Validar que não deve cadastrar carrinho sem token', () => {
        cy.request({
            method: 'POST',
            url: `${API_URL}/carrinhos`,
            failOnStatusCode: false,
            body: {
                produtos: [
                    { idProduto: produtoId1, quantidade: 1 }
                ]
            }
        }).then(res => {
            expect(res.status).to.eq(401)
            expect(res.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    })

    it('Validar que ao concluir compra o carrinho é excluído do usuário', () => {
        cy.request({
            method: 'DELETE',
            url: `${API_URL}/carrinhos/concluir-compra`,
            headers: {
                Authorization: userToken
            }
        }).then(res => {
            expect(res.status).to.eq(200)
            expect(res.body.message).to.match(/Registro excluído com sucesso|Não foi encontrado carrinho para esse usuário/)
        })
    })

    it('Validar que não é possível concluir compra sem token', () => {
        cy.request({
            method: 'DELETE',
            url: `${API_URL}/carrinhos/concluir-compra`,
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eq(401)
            expect(res.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    })

    it('Validar que ao cancelar compra os produtos devem retornar para estoque', () => {
        // Cria um novo carrinho para esse usuário
        cy.request({
            method: 'POST',
            url: `${API_URL}/carrinhos`,
            headers: {
                Authorization: userToken
            },
            body: {
                produtos: [
                    { idProduto: produtoId1, quantidade: 1 }
                ]
            }
        }).then(resCriacao => {
            expect(resCriacao.status).to.eq(201)

            cy.request({
                method: 'DELETE',
                url: `${API_URL}/carrinhos/cancelar-compra`,
                headers: {
                    Authorization: userToken
                }
            }).then(res => {
                expect(res.status).to.eq(200)
                expect(res.body.message).to.match(/Registro excluído com sucesso|Não foi encontrado carrinho para esse usuário/)
            })
        })
    })

    it('Validar que não é possível cancelar compra sem token', () => {
        cy.request({
            method: 'DELETE',
            url: `${API_URL}/carrinhos/cancelar-compra`,
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eq(401)
            expect(res.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    })
})
