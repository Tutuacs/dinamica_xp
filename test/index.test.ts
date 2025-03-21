import { describe, expect, it } from "bun:test";
import { api } from "../src";

describe('DinamicaXP', async () => {
    it('should return 200', async () => {
        const {data, status} = await api.clients.index.get()

        expect(data?.message).toBe('list users')
        expect(status).toBe(200)
    })

})