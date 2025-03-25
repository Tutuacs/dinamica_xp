import { t } from "elysia";
import { client } from "../../types";

export const validationSchema = {
    response: {
        200: t.Object({
            clients: t.Array(client)
        })
    },

    detail: {
        name: "ListClient",
        method: "GET",
        description: "List all clients",
        tags: ["Client"],
    }
}