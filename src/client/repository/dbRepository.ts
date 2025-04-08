import { PrismaClient } from "@prisma/client";
import { Client } from "../types";

export class ClientDb {
    private db: PrismaClient;

    constructor() {
        this.db = new PrismaClient();
    }

    public getClient(id: number, includePayments?: boolean): Promise<Client | null> {
        return
    }

    public getClients(includePayments?: boolean): Promise<Client[]> {
        return
    }
}