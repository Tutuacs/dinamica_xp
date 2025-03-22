import { describe, expect, it } from "bun:test";
import { edenTester } from "../src";

describe('Default Test', () => {
    it('should return a list of clients', async () => {
        const {data, status} = await edenTester.client.list.get();
        expect(status).toBe(200);
        expect(data).toEqual({message: "List all clients"});
    });
})