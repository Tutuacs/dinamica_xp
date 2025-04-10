import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { common } from "./common/common";

const prisma = new PrismaClient();

// Define os caminhos dos arquivos
const clientsFilePath: string = "./1428624292050_clientes.txt";
const paymentsFilePath: string = "./1428624292736_pagamentos.txt";


function parseDateString(dateStr: string): Date | null {
  const dt = new common();

  if (!dateStr || dateStr.trim() === "") {
    return null;
  }

  // Check if the dateStr is a numeric Unix timestamp (milliseconds or seconds)
  if (/^\d+$/.test(dateStr)) {
    const timestamp = parseInt(dateStr, 10);
    // Handle both milliseconds and seconds precision
    const date = new Date(timestamp > 9999999999 ? timestamp : timestamp * 1000);
    return isNaN(date.getTime()) ? null : date;
  }

  // Proceed with the existing transformation for formatted dates
  const transformedDate = dt.transformDate(dateStr);
  if (!transformedDate || transformedDate.length < 7) {
    return null;
  }

  const [d, m, y] = transformedDate.split("/");
  const day = parseInt(d, 10);
  const month = parseInt(m, 10);
  const year = parseInt(y, 10);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

  const date = new Date(year, month - 1, day);
  return isNaN(date.getTime()) ? null : date;
}


async function main() {
  // Leitura e processamento do arquivo de clientes
  const clientsRaw = readFileSync(clientsFilePath, "utf-8")
    .split("\n")
    .filter(line => line.trim() !== "");

  // Estrutura do arquivo de clientes:
  // [id];[cpf];[nascimento];[telefone];[nome];
  const clientsToInsert = clientsRaw.map(line => {
    const parts = line.split(";").filter(item => item !== "");
    return {
      id: parseInt(parts[0], 10),
      cpf: parts[1] || null,
      // Converte a data para Date ou null
      nascimento: parseDateString(parts[2]),
      telefone: parts[3] || null,
      nome: parts[4] || null,
      pendent: 0, // valor inicial; será atualizado posteriormente
      payd: 0,    // valor inicial; será atualizado posteriormente
    };
  });

  // Insere os clientes no banco; skipDuplicates evita erro se o id já existir
  await prisma.client.createMany({
    data: clientsToInsert,
  });

  // Leitura e processamento do arquivo de pagamentos
  const paymentsRaw = readFileSync(paymentsFilePath, "utf-8")
    .split("\n")
    .filter(line => line.trim() !== "");

  // Estrutura do arquivo de pagamentos:
  // [algum id];[data ou campo "unknow"];[clientId];[value];[t ou f];
  const paymentsToInsert = paymentsRaw.map(line => {
    const parts = line.split(";").filter(item => item !== "");
    // O campo "payd" será verdadeiro se o quinto campo for "t"
    const isPayd = parts[4] === "t";
    return {
      clientId: parseInt(parts[2], 10),
      // Converte a string da data para Date (ou null)
      paymentDate: parseDateString(parts[1]),
      // O campo "unknow" recebe o mesmo conteúdo do segundo campo
      unknow: parts[1] || null,
      value: parseFloat(parts[3]),
      payd: isPayd,
      pending: !isPayd,
    };
  });

  // Insere os pagamentos no banco
  await prisma.payment.createMany({
    data: paymentsToInsert,
  });

  // Atualiza os totais dos clientes:
  //   pendent: soma dos pagamentos com payd == false
  //   payd: soma dos pagamentos com payd == true
  for (const client of clientsToInsert) {
    const payments = await prisma.payment.findMany({
      where: { clientId: client.id },
    });

    const totalPayd = payments
      .filter(p => p.payd)
      .reduce((sum, p) => sum + p.value, 0);
    const totalPendent = payments
      .filter(p => !p.payd)
      .reduce((sum, p) => sum + p.value, 0);

    await prisma.client.update({
      where: { id: client.id },
      data: {
        payd: totalPayd,
        pendent: totalPendent,
      },
    });
  }

  console.log("Dados inseridos e atualizados com sucesso!");
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
