import { t } from "elysia";
import { payment, PaymentQueryStatus } from "../../types";

export const validationSchema = {

    query: t.Object({
        clientId: t.Optional(t.Number({minimum: 0})),
        status: t.Optional(t.Enum(PaymentQueryStatus, {default: PaymentQueryStatus.ALL}))
    }),

    response: {
        200: t.Object({
            payments: t.Array(payment)
        }),
        404: t. Object({
            message: t.Literal("This client has no payments")
        }),
    },

    detail: {
        name: "ListPayment",
        method: "GET",
        description: "List all payments based on query status && client",
        tags: ["Payment"],
    }

}