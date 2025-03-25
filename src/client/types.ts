import { t } from "elysia";
import { payment } from "../payment/types";

const clientId = t.Number({minimum: 0, description: "Client ID"});
const cpf = t.Optional(t.String({description: "Client CPF", minLength: 4}));
const nascimento = t.Optional(t.String({description: "Client birthdate", minLength: 1, maxLength: 10}));
const telefone = t.Optional(t.String({description: "Client phone number", minLength: 0, maxLength: 11}));
const nome = t.String({description: "Client name", minLength: 9});
const pendent = t.Optional(t.Number({description: "Client pendent", minimum: 0, default: 0}));

// // Definição do tipo Cliente
// export interface Cliente {
//     id: number;
//     cpf?: string | null;
//     nascimento?: string| null;
//     telefone?: string| null| null;
//     nome: string;
//     payments?: Payment[];
// }

export const client = t.Object({
    id: clientId,
    cpf: cpf,
    nascimento: nascimento,
    telefone: telefone,
    nome: nome,
    payments: t.Optional(t.Array(payment)),
    pendent: pendent
});

export type Client = typeof client.static