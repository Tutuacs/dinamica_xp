import { t } from "elysia";

export enum PaymentQueryStatus {
    ALL = "all",
    PAID = "paid",
    PENDING = "pending",
}

const clientId = t.Number({ minimum: 0, description: "Client ID" });
const paymentDate = t.Optional(t.String({ description: "Payment date", format: "date-time" }));
const unknow = t.Optional(t.String({ description: "Unknow" }));
const value = t.Number({ minimum: 0, description: "Payment value" });
const payd = t.Boolean({ description: "Payment status" });
const pending = t.Optional(t.Boolean({ description: "Payment status" }));

export const payment = t.Object({
    clientId: clientId,
    paymentDate: paymentDate,
    unknow: unknow,
    value: value,
    payd: payd
});

export const paymentByDate = t.Object({
    paymentDate: paymentDate,
    value: value,
    pending: pending,
})

export type Payment = typeof payment.static
export type PaymentByDate = typeof paymentByDate.static