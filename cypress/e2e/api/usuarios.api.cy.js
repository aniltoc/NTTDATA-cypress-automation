import { faker } from '@faker-js/faker'

describe('Gestão de Login e Usuários', () => {

    const nomeAdmin = faker.person.fullName()
    const emailAdmin = faker.internet.email().toLowerCase()
    const senhaAdmin = faker.internet.password({ length: 8 })
    const idInvalido = "123"

    let idUsuarioComum = null

    // 01 – Criar usuário ADMINISTRADOR 
    it('Validar cadastro de usuário ADMIN com sucesso', () => {

        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            failOnStatusCode: false,
            body: {
                nome: nomeAdmin,
                email: emailAdmin,
                password: senhaAdmin,
                administrador: 'true'
            }
        }).then((res) => {
            expect(res.status).to.eq(201)
            expect(res.body.message).to.eq('Cadastro realizado com sucesso')
            expect(res.body._id).to.exist
        })
    })

    // 02 – Login do admin 
    it('Validar o login do ADMIN com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            failOnStatusCode: false,
            body: {
                email: emailAdmin,
                password: senhaAdmin
            }
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.message).to.eq('Login realizado com sucesso')
            expect(res.body.authorization).to.exist
        })
    })

    it('Validar que não é possível deve logar com email/senha inválidos', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            failOnStatusCode: false,
            body: {
                email: 'emailInvalido@test.com',
                password: '123456'
            }
        }).then((res) => {
            expect(res.status).to.eq(401)
            expect(res.body.message).to.eq('Email e/ou senha inválidos')
        })
    })

    // 03 – Listar usuários 
    it('Validar lista de usuários cadastrados', () => {
        cy.request({
            method: 'GET',
            url: 'https://serverest.dev/usuarios'
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.usuarios).to.be.an('array')
            expect(res.body.quantidade).to.be.a('number')
        })
    })

    // 04 – Criar usuário comum 
    it('Validar cadastro de usuário COMUM com sucesso', () => {

        const nomeComum = faker.person.fullName()
        const emailComum = faker.internet.email().toLowerCase()
        const senhaComum = faker.internet.password({ length: 8 })

        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            failOnStatusCode: false,
            body: {
                nome: nomeComum,
                email: emailComum,
                password: senhaComum,
                administrador: 'false'
            }
        }).then((res) => {
            expect(res.status).to.eq(201)
            expect(res.body.message).to.eq('Cadastro realizado com sucesso')
            idUsuarioComum = res.body._id // salva ID para o restante do fluxo
        })
    })

    // 05 – Buscar usuário por ID
    it('Validar busca de usuário pelo ID', () => {

        cy.request({
            method: 'GET',
            url: `https://serverest.dev/usuarios/${idUsuarioComum}`
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body._id).to.eq(idUsuarioComum)
            expect(res.body.nome).to.exist
            expect(res.body.email).to.exist
        })
    })

    it('Validar que não é possível buscar usuário inexistente', () => {
        cy.request({
            method: 'GET',
            url: `https://serverest.dev/usuarios/${idInvalido}`,
            failOnStatusCode: false
        }).then((res) => {
            cy.log(JSON.stringify(res.body))

            expect(res.status).to.eq(400)
            expect(res.body.message).to.eq(undefined) //Na documentação swagger temos a seguinte informação quando o usário não é encontrado: status 400, resposta: Usuário não encontrado,  (continua abaixo)
        })                                            //  Example Value Model { "message": "Usuário não encontrado"}, porém na prática a API retorna status 400 com body undefined {}
    })

    // 06 – Editar usuário 
    it('Validar edição de um usuário comum', () => {
        const novoNome = faker.person.fullName()
        cy.request({
            method: 'PUT',
            url: `https://serverest.dev/usuarios/${idUsuarioComum}`,
            failOnStatusCode: false,
            body: {
                nome: novoNome,
                email: faker.internet.email().toLowerCase(),
                password: "123456",
                administrador: "false"
            }
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.message).to.eq('Registro alterado com sucesso')
        })
    })


    // 07 – Excluir usuário 
    it('Validar exclusão de usuário comum com sucesso', () => {
        cy.request({
            method: 'DELETE',
            url: `https://serverest.dev/usuarios/${idUsuarioComum}`,
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.message).to.contain('Registro excluído')
        })
    })

    it('Validar que não é permitido excluir usuário com carrinho cadastrado', () => {
        // Criar um novo usuário comum específico para este cenário
        const nomeUsuarioCarrinho = faker.person.fullName()
        const emailUsuarioCarrinho = faker.internet.email().toLowerCase()
        const senhaUsuarioCarrinho = faker.internet.password({ length: 8 })
        let idUsuarioCarrinho = null
        let tokenUsuarioCarrinho = null
        // Criar usuário comum
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            failOnStatusCode: false,
            body: {
                nome: nomeUsuarioCarrinho,
                email: emailUsuarioCarrinho,
                password: senhaUsuarioCarrinho,
                administrador: 'false'
            }
        }).then((resUsuario) => {
            expect(resUsuario.status).to.eq(201)
            expect(resUsuario.body._id).to.exist
            idUsuarioCarrinho = resUsuario.body._id
            // Login do usuário comum para obter token
            cy.request({
                method: 'POST',
                url: 'https://serverest.dev/login',
                failOnStatusCode: false,
                body: {
                    email: emailUsuarioCarrinho,
                    password: senhaUsuarioCarrinho
                }
            }).then((resLogin) => {
                expect(resLogin.status).to.eq(200)
                expect(resLogin.body.authorization).to.exist
                tokenUsuarioCarrinho = resLogin.body.authorization
                // Criar carrinho para o usuário comum antes de tentar excluir
                cy.request({
                    method: 'POST',
                    url: 'https://serverest.dev/carrinhos',
                    failOnStatusCode: false,
                    headers: {
                        Authorization: tokenUsuarioCarrinho
                    },
                    body: {
                        produtos: [
                            {
                                idProduto: "BeeJh5lz3k6kSIzA",
                                quantidade: 1
                            }
                        ]
                    }
                }).then((resCarrinho) => {
                    expect(resCarrinho.status).to.eq(201)
                    expect(resCarrinho.body.message).to.eq('Cadastro realizado com sucesso')
                    // Tentar excluir usuário que tem carrinho
                    cy.request({
                        method: 'DELETE',
                        url: `https://serverest.dev/usuarios/${idUsuarioCarrinho}`,
                        failOnStatusCode: false
                    }).then((res) => {
                        expect(res.status).to.eq(400)
                        expect(res.body.message).to.eq('Não é permitido excluir usuário com carrinho cadastrado')
                        expect(res.body.idCarrinho).to.exist
                    })
                })
            })
        })
    })

})
