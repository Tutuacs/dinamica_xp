import { t } from "elysia";

export const validationSchema = {
    response: {
        200: t.Object({
            message: t.Literal("list users")
        })
    },
    detail: {
        description: "This route should List all users",
        tags: ["Clients"]
    }
}