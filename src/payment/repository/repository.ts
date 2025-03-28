import * as fs from 'fs';
import { common } from '../../common/common';
import { Payment, paymentByDate, PaymentByDate, PaymentQueryStatus } from '../types';

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
            if (payd === 't' ||  parseInt(lineClientId, 10) !== clientId) {
                continue;
            }

            if (value)
                totalPendent += parseFloat(value);
        }

        return totalPendent;
    }

    public getPaydt(clientId?: number): number {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const file = data.split('\n');
        let totalPayd = 0;

        for (const line of file) {
            const [lineClientId, , , value, payd] = line.split(';');

            // Skip if payment is paid or doesn't match the requested clientId
            if (payd === 'f' || parseInt(lineClientId, 10) !== clientId) {
                continue;
            }

            if (value)
                totalPayd += parseFloat(value);
        }

        return totalPayd;
    }

    public getByDate(): PaymentByDate[] {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const file = data.split('\n');
        let totalPayd = 0;

        let dateMap = new Map()

        for (const line of file) {
            const [clientId, paymentDate, unknow, value, payd] = line.split(';');
            
            const key = paymentDate+payd

            if (dateMap.get(key)) {
                const total = dateMap.get(key) + parseInt(value, 10)
                dateMap.set(key, total)
            }

            dateMap.set(key, parseInt(value, 10))
        }

        const payments: {
            paymentDate?: string | undefined;
            order: string;
            value: number;
            pending: boolean;
        }[] = [];

        dateMap.forEach((value: number, key: string) => {
            if (!Number.isNaN(key)) {

                const dt = key.substring(0, key.length-1)
                const payd = key[key.length -1]

                let date = this.date.transformDate(dt)
                let dateOrder = date!.split('/')[2] + date!.split('/')[1] + date!.split('/')[0]

                let payment: {
                    paymentDate?: string | undefined;
                    order: string;
                    value: number;
                    pending: boolean;
                } = {
                    paymentDate: date,
                    order: dateOrder,
                    value: value,
                    pending: payd == 't',
                };

                payments.push(payment)
            }
        });
        payments.sort((a, b) => (parseInt(a.order, 10) > parseInt(b.order, 10) ? 1 : -1));

        const final: PaymentByDate[] = []

        for (const i of payments) {
            const item : PaymentByDate = {
                pending: i.pending,
                value: i.value,
                paymentDate: i.paymentDate,
            }
            final.push(item)
        }

        return final;
    }

}