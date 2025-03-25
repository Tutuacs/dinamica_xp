import * as fs from 'fs';
import { common } from '../../common/common';
import { Client } from '../types';
import { PaymentRepository } from '../../payment/repository/repository';

export class ClientRepository {
    private filePath: string = "./1428624292050_clientes.txt";
    private paymentRepository: PaymentRepository;
    private date: common;

    constructor() {
        this.paymentRepository = new PaymentRepository();
        this.date = new common();
    }

    public getClient(id: number, includePayments?: boolean): Client | null {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const file = data.split('\n');
        
        for (const line of file) {
            const [lineId, cpf, nascimento, telefone, nome] = line.split(';');

            if (lineId && parseInt(lineId, 10) === id) {
                const client: Client = {
                    id: parseInt(lineId, 10),
                    cpf: cpf || undefined,
                    nascimento: this.date.transformDate(nascimento),
                    telefone: telefone || undefined,
                    nome: nome || 'Cliente Sauna ?'
                };

                if (includePayments) {
                    const pendent = this.paymentRepository.getPendent(id);
                    const payment = this.paymentRepository.getPayments({id});
                    client.pendent = pendent? pendent : 0;
                    client.payments = payment;
                }

                return client;
            }
        }

        return null;
    }

    public getClients(includePayments?: boolean): Client[] {
        const data = fs.readFileSync(this.filePath, 'utf-8');

        const file = data.split('\n');
        
        const clients: Client[] = [];

        for (const line of file) {
            const [id, cpf, nascimento, telefone, nome] = line.split(';');

            if (!id || id == null) {
                continue;
            }

            const client: Client = {
                id: parseInt(id, 10),
                cpf: cpf || undefined,
                nascimento: this.date.transformDate(nascimento),
                telefone: telefone || undefined,
                nome: nome || 'Cliente Sauna ?'
            };

            if (includePayments) {
                const pendent = this.paymentRepository.getPendent(parseInt(id, 10));
                client.pendent = pendent? pendent : 0;
            }

            clients.push(client);
        }

        return clients;
    }
}