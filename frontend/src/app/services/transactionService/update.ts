import { httpClient } from "../httpClient";

export interface UpdateTransactionAccountParams {
  id: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  date: string;
  value: number;
  type: "INCOME" | "EXPENSE";
}

export async function update({ id, ...params }: UpdateTransactionAccountParams) {
  const { data } = await httpClient.put(
    `/transactions/${id}`,
    params
  );
  return data;
}
