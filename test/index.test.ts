import { describe, expect, it } from "bun:test";
import { api } from "../src";

describe('DinamicaXP', async () => {
    it('should return 200', async () => {
        const {data, status} = await api.client.list.get()

        expect(data?.message).toBe('List all clients')
        expect(status).toBe(200)
    })

})