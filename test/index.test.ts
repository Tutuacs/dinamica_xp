import { edenTreaty } from "@elysiajs/eden";
import { describe, expect, it } from "bun:test";
import { app } from "../src";

const BASE_URL = 'http://localhost:3000'
const api = edenTreaty<app>(BASE_URL)

describe('DinamicaXP', async () => {
    it('should return 200', async () => {
        const {data, status} = await api.client.list.get()

        if (status == 200) {
            expect(typeof data?.clients)
        }

        expect(status).toBe(200)
    })

})