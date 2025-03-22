import { t } from "elysia";

export const validationSchema = {
    response: {
        200: t.Object({
            message: t.Literal("List all clients")
        })
    },
    detail: {
        name: "ListClient",
        method: "GET",
        description: "List all clients",
        tags: ["Client"],
    }
}