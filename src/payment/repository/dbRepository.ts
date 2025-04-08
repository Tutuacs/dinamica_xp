import { PrismaClient } from "@prisma/client";
import { Payment, PaymentByDate, PaymentQueryStatus } from "../types";

export class PaymentDb {

    private db: PrismaClient;

    constructor() {
        this.db = new PrismaClient();
    }

    public async getPayments({ id, status }: { id?: number, status?: PaymentQueryStatus }): Promise<Payment[]> {
        return
    }

    public async getPendent(clientId?: number): Promise<Number> {
        return
    }

    public async getPaydt(clientId?: number): Promise<Number> {
        return
    }

    public async getByDate(): Promise<PaymentByDate[]> {
        return
    }

}
