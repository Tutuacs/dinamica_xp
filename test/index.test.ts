import { edenTreaty } from "@elysiajs/eden";
import { describe, expect, it } from "bun:test";
import { app } from "../src";

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
})