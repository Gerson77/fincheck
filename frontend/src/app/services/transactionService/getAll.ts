import { Transaction } from "../../entities/Transaction";
import { httpClient } from "../httpClient";

type TransactiontsResponse = Array<Transaction>

export type TransactionFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: Transaction['type']
}

export async function getAll(filters: TransactionFilters) {
  const { data } = await httpClient.get<TransactiontsResponse>("/transactions", {
    params: filters
  });
  return data;
}

// transactions?month=10&year=2023
