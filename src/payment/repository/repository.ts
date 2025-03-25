import * as fs from 'fs';
import { common } from '../../common/common';
import { Payment, PaymentQueryStatus } from '../types';

export class PaymentRepository {
    private filePath: string = "./1428624292736_pagamentos.txt";
    private date: common;

    constructor() {
        this.date = new common();     
    }

    public getPayments({ id, status }: { id?: number, status?: PaymentQueryStatus }): Payment[] {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const file = data.split('\n');

        const payments: Payment[] = [];

        for (const line of file) {
            const [clientId, paymentDate, unknow, value, payd] = line.split(';');

            if (id != null && parseInt(clientId, 10) !== id) {
                continue;
            }

            if (status && status !== PaymentQueryStatus.ALL) {
                const condPaid = status === PaymentQueryStatus.PAID && payd === 't';
                const condPending = status === PaymentQueryStatus.PENDING && payd === 'f';

                if (condPaid || condPending) {
                    continue;
                }
            }

            payments.push({
                clientId: parseInt(clientId, 10),
                paymentDate: this.date.transformDate(paymentDate),
                unknow: unknow,
                value: parseFloat(value),
                payd: payd === 't'
            });
        }

        return payments;
    }

    public getPendent(clientId?: number): number {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const file = data.split('\n');
        let totalPendent = 0;

        for (const line of file) {
            const [lineClientId, , , value, payd] = line.split(';');

            // Skip if payment is paid or doesn't match the requested clientId
            if (payd === 't' || (clientId && parseInt(lineClientId, 10) !== clientId)) {
                continue;
            }

            totalPendent += parseFloat(value);
        }

        return totalPendent;
    }
}