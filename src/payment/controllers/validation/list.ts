import { t } from "elysia";
import { PaymentQueryStatus } from "../../types";

export const validationSchema = {

    query: t.Object({
        clientId: t.Optional(t.String()),
        status: t.Optional(t.Enum(PaymentQueryStatus, {default: PaymentQueryStatus.ALL}))
    }),

    response: {
        200: t.Object({
            message: t.Literal(`List all payments based on query status && client`)
        }),
    },

    detail: {
        name: "ListPayment",
        method: "GET",
        description: "List all payments based on query status && client",
        tags: ["Payment"],
    }

}