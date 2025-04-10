import { edenTreaty } from "@elysiajs/eden";
import { describe, expect, it } from "bun:test";
import * as fs from 'fs';
import { app } from "../src";
import { ClientRepository } from "../src/client/repository/repository";
import { PaymentQueryStatus } from "../src/payment/types";
import { PaymentDb } from "../src/payment/repository/dbRepository";
import { ClientDb } from "../src/client/repository/dbRepository";

const BASE_URL = 'http://localhost:3000'
const api = edenTreaty<app>(BASE_URL)

describe('DinamicaXP Pendent', async () => {
    it('should return the user total pendent payments grater than 0', async () => {
        const { data, status } = await api.payment.pendent.get()

        expect(status).toBe(200)
        const clients = data?.clients
        for (const client of clients!) {
            expect(client.pendent).toBeGreaterThan(0)
        }
    })
    it('should the clients with payd values', async () => {
        const { data, status } = await api.payment.payd.get()

        expect(status).toBe(200)
        const clients = data?.clients
        for (const client of clients!) {
            expect(client.payd).toBeGreaterThanOrEqual(0)
        }
    })
    it('should the clients file exists', () => {
        const path = "./1428624292050_clientes.txt"
        expect(fs.existsSync(path)).toBe(true)
    })
    it('should the payents file exists', () => {
        const path = "./1428624292736_pagamentos.txt"
        expect(fs.existsSync(path)).toBe(true)
    })
    it('should verify if payment list lists all results', async () => {
        const result = await api.payment.list.get({
            $query: {
                clientId: -1,
                status: PaymentQueryStatus.ALL,
            }
        })

        expect(result.status).toBe(200)
    })
    it('should verify if the clients on payments file are on clients file', async () => {
        const result = await api.payment.list.get({
            $query: {
                clientId: -1,
                status: PaymentQueryStatus.ALL,
            }
        })

        const distinctClients: number[] = []

        for (const client of result.data!.payments) {
            if (!distinctClients.includes(client.clientId)) {
                distinctClients.push(client.clientId)
            }
        }

        const clientRepository = new ClientRepository()
        const clientResult = clientRepository.getClients()

        for (const clientId of distinctClients) {
            const client = clientResult.find(client => client.id === clientId)
            expect(client).toBeObject()
            expect(client!.id).toBe(clientId)
        }
    })
})

describe('Test Db Class', () => {
    
    describe('PaymentDb -> should Test the PaymentDB class', () => {
        const payment = new PaymentDb()

        describe('getPayments() -> should return the client or clients based on id and payments based on status', () => {
            describe('should get only payments with the required status', () => {
                it('should return only status PENDING', async () => {
                    const status = PaymentQueryStatus.PENDING
                    const result = await payment.getPayments({ status })

                    expect(result).toBeArray()
                    if (result.length > 0) {
                        for (const payment of result) {
                            expect(payment.payd).toBe(false)
                        }
                    }
                })
                it('should return only status PAID', async () => {
                    const status = PaymentQueryStatus.PAID
                    const result = await payment.getPayments({ status })

                    expect(result).toBeArray()
                    if (result.length > 0) {
                        for (const payment of result) {
                            expect(payment.payd).toBe(true)
                        }
                    }
                })
            })
            describe('should get only payments with the required id', () => {
                const id = 0
                it('should return only payments with id 1', async () => {
                    const result = await payment.getPayments({ id })

                    expect(result).toBeArray()
                    if (result.length > 0) {
                        for (const payment of result) {
                            expect(payment.clientId).toBe(id)
                        }
                    }
                })
            })
        })

        describe('getPendent() -> should return the total of payments with status PENDING', () => {
            it('should return the total of payments with status PENDING or 0', async () => {
                const result = await payment.getPendent(1)

                expect(result).toBeNumber()
                expect(result).toBeGreaterThan(-1)
            })
        })

        describe('getPayd() -> should return the total of payments with status PAID', () => {
            it('should return the total of payments with status PAID or 0', async () => {
                const result = await payment.getPaydt(1)

                expect(result).toBeNumber()
                expect(result).toBeGreaterThan(-1)
            })
        })

        describe('getByDate() -> should return the payments grouped by date', () => {
            it('should return the payments grouped by date on DESC order', async () => {
                const result = await payment.getByDate()

                let lastDate = { day: "", month: "", year: "" }
                let lastPayment = false
                // verifica se o resultado é um array
                expect(result).toBeArray()
                if (result.length > 0) {
                    for (const payment of result) {
                        expect(payment.paymentDate).toBeString()
                        expect(payment.value).toBeNumber()
                        if (lastDate.day.length > 0) {
                            const [day, month, year] = payment.paymentDate!.split('/')
                            const actualDate = parseInt(year) * 10000 + parseInt(month) * 100 + parseInt(day)
                            const lastDateValue = parseInt(lastDate.year) * 10000 + parseInt(lastDate.month) * 100 + parseInt(lastDate.day)
                            if (lastDateValue == actualDate) {
                                // se for o mesma data o status de pagamento deve ser diferente
                                expect(payment.pending).not.toBe(lastPayment)
                                continue
                            }
                            // se for datas diferentes a data atual deve ser menor que a data anterior
                            expect(actualDate).toBeLessThan(lastDateValue)
                        }
                        lastDate = {
                            day: payment.paymentDate!.split('/')[0],
                            month: payment.paymentDate!.split('/')[1],
                            year: payment.paymentDate!.split('/')[2]
                        }
                        lastPayment = payment.pending!
                    }
                }
            })
        })

    })

    describe('ClientDb -> should Test the ClientDB class', () => {
        const client = new ClientDb()

        describe('getClient() -> should return the client with the required id', () => {
            it('should return the client with id 1', async () => {
                const id = 1
                const result = await client.getClient(id)

                if (result !== null) {
                    expect(result).toBeObject()
                    expect(result!.id).toBe(id)
                }
            })
        })

        describe('getClients() -> should return a client list, with or without payments', () => {
            it('should return the clients with pendent value', async() => {
                const includePayments = true
                const result = await client.getClients(includePayments)
                expect(result).toBeArray()
                if (result.length > 0) {
                    for (const client of result) {
                        expect(client).toBeObject()
                        expect(client.pendent).toBeNumber()
                        expect(client.pendent).toBeGreaterThanOrEqual(0)
                    }
                }
            })
            it('should return the clients without pendent value', async() => {
                const includePayments = false
                const result = await client.getClients(includePayments)
                expect(result).toBeArray()
                if (result.length > 0) {
                    for (const client of result) {
                        expect(client).toBeObject()
                        expect(client.pendent).toBeUndefined()
                    }
                }
            })
        })

    })

})