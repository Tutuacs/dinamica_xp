import { edenTreaty } from "@elysiajs/eden";
import { describe, expect, it } from "bun:test";
import * as fs from 'fs';
import { app } from "../src";
import { ClientRepository } from "../src/client/repository/repository";
import { PaymentQueryStatus } from "../src/payment/types";

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
        const path ="./1428624292050_clientes.txt"
        expect(fs.existsSync(path)).toBe(true)
    })
    it('should the payents file exists', () => {
        const path ="./1428624292736_pagamentos.txt"
        expect(fs.existsSync(path)).toBe(true)
    })
    it('should verify if payment list lists all results', async() => {
        const result = await api.payment.list.get({
            $query: {
                clientId: -1,
                status: PaymentQueryStatus.ALL,
            }
        })

        expect(result.status).toBe(200)
    })
    it('should verify if the clients on payments file are on clients file', async() => {
        const result = await api.payment.list.get({
            $query: {
                clientId: -1,
                status: PaymentQueryStatus.ALL,
            }
        })

        const distinctClients: number[] = []

        for(const client of result.data!.payments) {
            if (!distinctClients.includes(client.clientId)) {
                distinctClients.push(client.clientId)
            }
        }

        const clientRepository = new ClientRepository()
        const clientResult = clientRepository.getClients()

        for(const clientId of distinctClients) {
            const client = clientResult.find(client => client.id === clientId)
            expect(client).toBeObject()
            expect(client!.id).toBe(clientId)
        }
    })
})
