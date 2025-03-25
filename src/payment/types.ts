import { t } from "elysia";

export enum PaymentQueryStatus {
    ALL = "all",
    PAID = "paid",
    PENDING = "pending",
}

const clientId = t.Number({minimum: 0, description: "Client ID"});
const paymentDate = t.Optional(t.String({description: "Payment date", minLength: 7, maxLength: 10}));
const unknow = t.Optional(t.String({description: "Unknow"}));
const value = t.Number({minimum: 0, description: "Payment value"});
const payd = t.Boolean({description: "Payment status"});

// // Definição do tipo Payment
// export interface Payment {
//     clientId?: string | null;
//     paymentDate?: string | null;
//     unknow?: string | null;
//     value: string;
//     payd: boolean;
// }

export const payment = t.Object({
    clientId: clientId,
    paymentDate: paymentDate,
    unknow: unknow,
    value: value,
    payd: payd
});

export type Payment = typeof payment.static