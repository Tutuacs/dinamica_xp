import { PrismaClient, payment as PrismaPayment } from "@prisma/client";
import { Payment, PaymentByDate, PaymentQueryStatus } from "../types";

export class PaymentDb {

    private db: PrismaClient;

    constructor() {
        this.db = new PrismaClient();
    }

    private toPayment(payment: PrismaPayment): Payment {
        return {
            clientId: payment.clientId,
            paymentDate: payment.paymentDate?.toISOString(),
            unknow: payment.unknow ?? undefined,
            value: payment.value,
            payd: payment.payd
        };
    }

    public async getPayments({ id, status }: { id?: number, status?: PaymentQueryStatus }): Promise<Payment[]> {
        const whereClause: any = {};

        if (id !== undefined) whereClause.clientId = id;

        if (status === PaymentQueryStatus.PAID) {
            whereClause.payd = true;
        } else if (status === PaymentQueryStatus.PENDING) {
            whereClause.payd = false;
        }

        const payments = await this.db.payment.findMany({
            where: whereClause
        });

        return payments.map(this.toPayment);
    }

    public async getPendent(clientId?: number): Promise<number> {
        const result = await this.db.payment.aggregate({
            _sum: {
                value: true
            },
            where: {
                payd: false,
                ...(clientId ? { clientId } : {})
            }
        });

        return result._sum.value ?? 0;
    }

    public async getPaydt(clientId?: number): Promise<number> {
        const result = await this.db.payment.aggregate({
            _sum: {
                value: true
            },
            where: {
                payd: true,
                ...(clientId ? { clientId } : {})
            }
        });

        return result._sum.value ?? 0;
    }

    public async getByDate(): Promise<PaymentByDate[]> {
        const result = await this.db.payment.groupBy({
            by: ['paymentDate'],
            _sum: {
                value: true
            },
            _count: {
                _all: true
            },
            where: {
                paymentDate: {
                    not: null
                }
            },
            orderBy: {
                paymentDate: 'asc'
            }
        });

        // distinct? 
        return result.map(r => ({
            paymentDate: r.paymentDate?.toISOString(),
            value: r._sum.value ?? 0,
            pending: undefined
        }));
    }

}
