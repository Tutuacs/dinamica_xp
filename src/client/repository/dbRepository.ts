import { PrismaClient } from "@prisma/client";
import { Client } from "../types";


export class ClientDb {
    private db: PrismaClient;


    constructor() {
        this.db = new PrismaClient();
    }


    private toClient(client: any): Client {
        return {
            id: client.id,
            cpf: client.cpf ?? undefined,
            nascimento: client.nascimento?.toISOString().split("T")[0],
            telefone: client.telefone ?? undefined,
            nome: client.nome ?? "Cliente Sauna ?",
            pendent: client.pendent ?? 0,
            payd: client.payd ?? 0,
            payments: client.Payment?.map((p: any) => ({
                clientId: p.clientId,
                paymentDate: p.paymentDate?.toISOString(),
                unknow: p.unknow ?? undefined,
                value: p.value,
                payd: p.payd
            }))
        };
    }


    public async getClient(id: number, includePayments?: boolean): Promise<Client | null> {
        const client = await this.db.client.findUnique({
            where: { id },
            include: {
                Payment: includePayments ?? false
            }
        });


        return client ? this.toClient(client) : null;
    }


    public async getClients(includePayments?: boolean): Promise<Client[]> {
        const clients = await this.db.client.findMany({
            include: {
                Payment: includePayments ?? false
            }
        });


        return clients.map(this.toClient);
    }
}

