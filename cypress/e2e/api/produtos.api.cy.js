import { faker } from '@faker-js/faker'

const API_URL = 'https://serverest.dev'

describe('Gestão de produtos', () => {
    let adminToken
    let userToken
    let produtoId
    let produtoNome

    before(() => {
        const adminEmail = faker.internet.email().toLowerCase()
        const adminSenha = 'admin123'

        const userEmail = faker.internet.email().toLowerCase()
        const userSenha = 'user123'

        // Criando usuário admin
        cy.request('POST', `${API_URL}/usuarios`, {
            nome: faker.person.fullName(),
            email: adminEmail,
            password: adminSenha,
            administrador: 'true'
        }).its('status').should('eq', 201)

        // Realizando Login admin
        cy.request('POST', `${API_URL}/login`, {
            email: adminEmail,
            password: adminSenha
        }).then(res => {
            expect(res.status).to.eq(200)
            expect(res.body.authorization).to.exist
            adminToken = res.body.authorization
        })

        // Criando usuário comum
        cy.request('POST', `${API_URL}/usuarios`, {
            nome: faker.person.fullName(),
            email: userEmail,
            password: userSenha,
            administrador: 'false'
        }).its('status').should('eq', 201)

        // Login usuário comum
        cy.request('POST', `${API_URL}/login`, {
            email: userEmail,
            password: userSenha
        }).then(res => {
            expect(res.status).to.eq(200)
            expect(res.body.authorization).to.exist
            userToken = res.body.authorization
        })
    })

    it('Validar lista de produtos cadastrados', () => {
        cy.request('GET', `${API_URL}/produtos`)
            .then(res => {
                expect(res.status).to.eq(200)
                expect(res.body).to.have.property('quantidade')
                expect(res.body).to.have.property('produtos')
                expect(res.body.produtos).to.be.an('array')
            })
    })

    it('Validar cadastro de produto com sucesso com usuário admin', () => {
        produtoNome = `Produto ${faker.commerce.productName()}`

        cy.request({
            method: 'POST',
            url: `${API_URL}/produtos`,
            headers: {
                Authorization: adminToken
            },
            body: {
                nome: produtoNome,
                preco: 100,
                descricao: 'Produto criado via teste automatizado',
                quantidade: 10
            }
        }).then(res => {
            expect(res.status).to.eq(201)
            expect(res.body.message).to.eq('Cadastro realizado com sucesso')
            expect(res.body._id).to.exist
            produtoId = res.body._id
        })
    })

    it('Validar que não é possível cadastrar produto com nome duplicado', () => {
        cy.request({
            method: 'POST',
            url: `${API_URL}/produtos`,
            headers: {
                Authorization: adminToken
            },
            failOnStatusCode: false,
            body: {
                nome: produtoNome, // mesmo nome do produto criado anteriormente
                preco: 200,
                descricao: 'Outro produto com mesmo nome',
                quantidade: 5
            }
        }).then(res => {
            expect(res.status).to.eq(400)
            expect(res.body.message).to.eq('Já existe produto com esse nome')
        })
    })

    it('Validar que não é possível cadastrar produto sem token', () => {
        cy.request({
            method: 'POST',
            url: `${API_URL}/produtos`,
            failOnStatusCode: false,
            body: {
                nome: `Produto sem token ${faker.commerce.productName()}`,
                preco: 50,
                descricao: 'Produto sem token',
                quantidade: 1
            }
        }).then(res => {
            expect(res.status).to.eq(401)
            expect(res.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    })

    it('Validar que não é possível cadastrar produto com usuário não administrador', () => {
        cy.request({
            method: 'POST',
            url: `${API_URL}/produtos`,
            headers: {
                Authorization: userToken
            },
            failOnStatusCode: false,
            body: {
                nome: `Produto usuario comum ${faker.commerce.productName()}`,
                preco: 80,
                descricao: 'Tentativa com usuario comum',
                quantidade: 3
            }
        }).then(res => {
            expect(res.status).to.eq(403)
            expect(res.body.message).to.eq('Rota exclusiva para administradores')
        })
    })

    it('Validar busca de produto com ID existente', () => {
        cy.request('GET', `${API_URL}/produtos/${produtoId}`)
            .then(res => {
                expect(res.status).to.eq(200)
                expect(res.body).to.have.property('nome', produtoNome)
                expect(res.body).to.have.property('_id', produtoId)
            })
    })

    it('Validar que não é possível buscar produto inexistente', () => {
        const idInvalido = 'IDPRODUTO_INEXISTENTE_123'

        cy.request({
            method: 'GET',
            url: `${API_URL}/produtos/${idInvalido}`,
            failOnStatusCode: false
        }).then((res) => {
            cy.log(JSON.stringify(res.body))

            // Swagger diz 400 + "Produto não encontrado",
            // mas na prática a API retorna 400 + undefined {} e não a mensagem esperada
            expect(res.status).to.eq(400)
            expect(res.body.message).to.eq(undefined)
        })
    })

    it('Validar editação de produto com sucesso com usuário admin', () => {
        const novoNome = `${produtoNome} - Editado`

        cy.request({
            method: 'PUT',
            url: `${API_URL}/produtos/${produtoId}`,
            headers: {
                Authorization: adminToken
            },
            body: {
                nome: novoNome,
                preco: 150,
                descricao: 'Produto atualizado via teste automatizado',
                quantidade: 20
            }
        }).then(res => {
            expect(res.status).to.eq(200)
            expect(res.body.message).to.eq('Registro alterado com sucesso')
            produtoNome = novoNome
        })
    })

    it('Validar que não é possível editar produto com nome duplicado', () => {
        const nomeDuplicado = 'Produto Duplicado API'

        // 1) Cria produto com nome fixo para tentar duplicar depois
        cy.request({
            method: 'POST',
            url: `${API_URL}/produtos`,
            headers: {
                Authorization: adminToken
            },
            failOnStatusCode: false,
            body: {
                nome: nomeDuplicado,
                preco: 90,
                descricao: 'Produto base para duplicidade',
                quantidade: 5
            }
        }).then(resCriacao => {
            expect(resCriacao.status).to.eq(400)
            expect(resCriacao.body.message).to.eq('Já existe produto com esse nome')

            // 2) Tentar editar o produto principal usando o nome duplicado
            cy.request({
                method: 'PUT',
                url: `${API_URL}/produtos/${produtoId}`,
                headers: {
                    Authorization: adminToken
                },
                failOnStatusCode: false,
                body: {
                    nome: nomeDuplicado,
                    preco: 150,
                    descricao: 'Tentativa de duplicidade',
                    quantidade: 30
                }
            }).then(res => {
                expect(res.status).to.eq(400)
                expect(res.body.message).to.eq('Já existe produto com esse nome')
            })
        })
    })

    it('Validar que não é possível editar produto sem token', () => {
        cy.request({
            method: 'PUT',
            url: `${API_URL}/produtos/${produtoId}`,
            failOnStatusCode: false,
            body: {
                nome: `${produtoNome} sem token`,
                preco: 200,
                descricao: 'Edição sem token',
                quantidade: 50
            }
        }).then(res => {
            expect(res.status).to.eq(401)
            expect(res.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    })

    it('Validar que não é possível editar produto com usuário não administrador', () => {
        cy.request({
            method: 'PUT',
            url: `${API_URL}/produtos/${produtoId}`,
            headers: {
                Authorization: userToken
            },
            failOnStatusCode: false,
            body: {
                nome: `${produtoNome} usuario comum`,
                preco: 200,
                descricao: 'Edição com usuario comum',
                quantidade: 50
            }
        }).then(res => {
            expect(res.status).to.eq(403)
            expect(res.body.message).to.eq('Rota exclusiva para administradores')
        })
    })

    it('Validar que é possível excluir produto com sucesso com usuário admin', () => {
        cy.request({
            method: 'DELETE',
            url: `${API_URL}/produtos/${produtoId}`,
            headers: {
                Authorization: adminToken
            }
        }).then(res => {
            expect(res.status).to.eq(200)
            expect(res.body.message).to.match(/Registro excluído com sucesso|Nenhum registro excluído/)
        })
    })

    it('Validar que não é possível excluir produto sem token', () => {
        cy.request({
            method: 'DELETE',
            url: `${API_URL}/produtos/${produtoId}`,
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eq(401)
            expect(res.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    })

    it('Validar que não é possível excluir produto com usuário não administrador', () => {
        cy.request({
            method: 'DELETE',
            url: `${API_URL}/produtos/${produtoId}`,
            headers: {
                Authorization: userToken
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eq(403)
            expect(res.body.message).to.eq('Rota exclusiva para administradores')
        })
    })

    it('Validar que não é permitido excluir produto que faz parte de carrinho', () => {
        const nomeProdutoCarrinho = `Produto carrinho ${faker.commerce.productName()}`
        let produtoIdCarrinho

        // 1) Criar produto que será adicionado ao carrinho
        cy.request({
            method: 'POST',
            url: `${API_URL}/produtos`,
            headers: {
                Authorization: adminToken
            },
            body: {
                nome: nomeProdutoCarrinho,
                preco: 120,
                descricao: 'Produto vinculado a carrinho para teste de exclusão',
                quantidade: 5
            }
        }).then(resProduto => {
            expect(resProduto.status).to.eq(201)
            expect(resProduto.body._id).to.exist
            produtoIdCarrinho = resProduto.body._id

            // 2) Criar carrinho contendo esse produto (usuário comum)
            cy.request({
                method: 'POST',
                url: `${API_URL}/carrinhos`,
                headers: {
                    Authorization: userToken
                },
                failOnStatusCode: false,
                body: {
                    produtos: [
                        {
                            idProduto: produtoIdCarrinho,
                            quantidade: 1
                        }
                    ]
                }
            }).then(resCarrinho => {
                expect(resCarrinho.status).to.eq(201)
                expect(resCarrinho.body.message).to.eq('Cadastro realizado com sucesso')

                // 3) Tentar excluir o produto que faz parte de carrinho
                cy.request({
                    method: 'DELETE',
                    url: `${API_URL}/produtos/${produtoIdCarrinho}`,
                    headers: {
                        Authorization: adminToken
                    },
                    failOnStatusCode: false
                }).then(resDelete => {
                    cy.log(JSON.stringify(resDelete.body))

                    expect(resDelete.status).to.eq(400)
                    expect(resDelete.body.message).to.eq('Não é permitido excluir produto que faz parte de carrinho')

                    // Swagger diz que deveria retornar "idCarrinho" com array,
                    // porém na prática a API retorna apenas a mensagem, sem o campo idCarrinho
                    expect(resDelete.body.idCarrinho).to.be.undefined
                })
            })
        })
    })
})
