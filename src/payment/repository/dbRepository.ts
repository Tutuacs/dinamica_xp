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

        if (id !== undefined && id != -1) whereClause.clientId = id;

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
        // Get pending payments (payd = false)
        const pendingPayments = await this.db.payment.groupBy({
            by: ['paymentDate', "payd"],
            _sum: {
                value: true,
            },
            where: {
                paymentDate: { not: null },
                payd: false,
            },
            orderBy: {
                paymentDate: 'desc'
            }
        });
    
        // Get paid payments (payd = true)
        const paidPayments = await this.db.payment.groupBy({
            by: ['paymentDate', "payd"],
            _sum: {
                value: true,
            },
            where: {
                paymentDate: { not: null },
                payd: true,
            },
            orderBy: {
                paymentDate: 'desc'
            }
        });
    
        // Combine both sets
        const allPayments = [...pendingPayments, ...paidPayments];
        
        const result: PaymentByDate[] = [];
        const formatDate = (date: Date) => {
            if (!date) return '';
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };
    
        for (const p of allPayments) {
            const value = p._sum.value ?? 0;
            const date = p.paymentDate ? formatDate(p.paymentDate) : '';
            
            // Find if we already have an entry for this exact date and payment status
            const existingIndex = result.findIndex(item => 
                item.paymentDate && 
                formatDate(new Date(item.paymentDate)) === date && 
                item.pending === !p.payd
            );
    
            if (existingIndex !== -1) {
                // If found, sum the values
                result[existingIndex].value += value;
            } else {
                // Otherwise create a new entry
                result.push({
                    paymentDate: p.paymentDate ? new Date(p.paymentDate).toISOString() : undefined,
                    value,
                    pending: !p.payd // Convert payd to pending status
                });
            }
        }
    
        // Sort the final result by paymentDate in descending order
        result.sort((a, b) => {
            if (!a.paymentDate || !b.paymentDate) return 0;
            return new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime();
        });
    
        return result;    
    }

}
