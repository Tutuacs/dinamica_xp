import { edenTreaty } from "@elysiajs/eden";
import { describe, expect, it } from "bun:test";
import { app } from "../src";
import { client } from "../src/client/types";

const BASE_URL = 'http://localhost:3000'
const api = edenTreaty<app>(BASE_URL)

describe('DinamicaXP Pendent', async () => {
    it('should return the user total pendent payments', async () => {
        const { data, status } = await api.payment.pendent[1].get()

        expect(status).toBe(200)
        expect(typeof data?.total).toBe("number")
        it('the total should be equal or greater than 0', () => {
            if (data) {
                expect(data.total).toBeGreaterThanOrEqual(0)
            }
        })
    })
    it('should return 0 if user doesnt exist', async () => {
        const { data, status } = await api.payment.pendent[72].get()

        expect(status).toBe(200)
        expect(typeof data?.total).toBe("number")
        if (data) {
            expect(data.total).toBe(0)
        }
    })
    it('should return error if id is not valid', async () => {
        const list = ["dwa", -1]
        for (const i of list) {
            const { error } = await api.payment.pendent[i].get()
            
            if (error) {
                expect(error.status).toBe(422)
            }
        }
    })
})