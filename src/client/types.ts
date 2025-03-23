import { Payment } from "../payment/types";

// Definição do tipo Cliente
export interface Cliente {
    id: number;
    cpf?: string | null;
    nascimento?: string| null;
    telefone?: string| null| null;
    nome: string;
    payments?: Payment[];
}