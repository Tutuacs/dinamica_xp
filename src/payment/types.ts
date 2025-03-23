export enum PaymentQueryStatus {
    ALL = "all",
    PAID = "paid",
    PENDING = "pending",
}

// Definição do tipo Payment
export interface Payment {
    clientId?: string | null;
    paymentDate?: string | null;
    unknow?: string | null;
    value: string;
    payd: boolean;
}