import { httpClient } from "../httpClient";

export interface CreateTransactionAccountParams {
  bankAccountId: string;
  categoryId: string;
  name: string;
  date: string;
  value: number;
  type: "INCOME" | "EXPENSE";
}

export async function create(params: CreateTransactionAccountParams) {
  const { data } = await httpClient.post(
    "/transactions",
    params
  );
  return data;
}
