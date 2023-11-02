import { useQuery } from "@tanstack/react-query";
import { transactionServices } from "../services/transactionService";
import { TransactionFilters } from "../services/transactionService/getAll";

export function useTransactions(filters: TransactionFilters) {
  const { data, isFetching, isInitialLoading, refetch } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactionServices.getAll(filters),
  });

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    refetchTransactions: refetch,
  };
}
