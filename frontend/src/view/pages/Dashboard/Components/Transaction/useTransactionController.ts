import { useEffect, useState } from "react";
import { useDashboard } from "../DashboarContext/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { TransactionFilters } from "../../../../../app/services/transactionService/getAll";
import { Transaction } from "../../../../../app/entities/Transaction";

export function useTransactionController() {
  const { areaValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdit, setTransactionBeingEdit] = useState<Transaction | null>(null)

  const [filters, setFilters] = useState<TransactionFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const {
    transactions,
    isLoading,
    isInitialLoading,
    refetchTransactions
  } = useTransactions(filters);

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  function handleChangeFilters<TFilter extends keyof TransactionFilters>(filter: TFilter) {
    return (value: TransactionFilters[TFilter]) => {
      if(value === filters[filter]) return

      setFilters(prevState => ({
        ...prevState,
        [filter]: value
      }))
    }
  }

  function handleApplyFilters({ bankAccountId, year }: { bankAccountId: string | undefined; year: number }) {
    handleChangeFilters("bankAccountId")(bankAccountId)
    handleChangeFilters("year")(year)
    setIsFiltersModalOpen(false)
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }
  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleOpenEditModal(transaction: Transaction) {
    setIsEditModalOpen(true)
    setTransactionBeingEdit(transaction)
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false)
    setTransactionBeingEdit(null)
  }

  return {
    areaValuesVisible,
    transactions,
    isInitialLoading: isInitialLoading,
    isLoading,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFiltersModalOpen,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    isEditModalOpen,
    transactionBeingEdit,
    handleOpenEditModal,
    handleCloseEditModal,
  };
}
