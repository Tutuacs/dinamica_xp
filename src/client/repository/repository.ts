import * as fs from 'fs';
import { common } from '../../common/common';
import { Cliente } from '../types';
import { PaymentRepository } from '../../payment/repository/repository';

export class ClienteRepository {
    private filePath: string = "./1428624292050_clientes.txt";
    private date: common = new common();

    constructor() {}

    public getClientes({includePayments, clientId}: {includePayments?: boolean, clientId?: number}): Cliente[] | Cliente {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const file = data.split('\n');
        
        const clients: Cliente[] = [];

        for (const line of file) {
            const [id, cpf, nascimento, telefone, nome] = line.split(';');

            if (id && id !== id) {
                continue;
            }

            if (includePayments) {

                const paymentRepository = new PaymentRepository();
                const payments = paymentRepository.getPayments({id: clientId});

                return {
                    id: parseInt(id, 10),
                    cpf: cpf || null,
                    nascimento: this.date.transformDate(nascimento),
                    telefone: telefone || null,
                    nome: nome?.trim() || '',
                    payments: payments
                };
            }

            clients.push({
                id: parseInt(id, 10),
                cpf: cpf || null,
                nascimento: this.date.transformDate(nascimento),
                telefone: telefone || null,
                nome: nome?.trim() || ''
            });
        }

        return clients;
    }
}