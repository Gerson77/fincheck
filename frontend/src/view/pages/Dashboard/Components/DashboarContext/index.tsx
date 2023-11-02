import { createContext, useCallback, useState } from "react";
import { BankAccount } from "../../../../../app/entities/BankAccount";

interface DashboardContextValue {
  areaValuesVisible: boolean;
  toggleValuesVisibility: () => void;
  isNewAccountModalOpen: boolean
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
  isNewTransactionModalOpen: boolean;
  openNewTransactionModal: (type: 'INCOME' | 'EXPENSE') => void;
  closeNewTransactionModal: () => void;
  newTransactionType: 'INCOME' | 'EXPENSE' | null;
  isEditAccountModalOpen: boolean;
  openEditBankAccountModal(bankAccount: BankAccount): void;
  closeEditBankAccountModal(): void;
  accountBeingEdited: BankAccount | null;
}
export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areaValuesVisible, setAreaValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState<'INCOME'| 'EXPENSE' | null>(null)

  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [accountBeingEdited, setAccountBeingEdited] = useState<BankAccount | null>(null);

  const toggleValuesVisibility = useCallback(() => {
    setAreaValuesVisible((prevState) => !prevState);
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type)
    setIsNewTransactionModalOpen(true);
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null)
    setIsNewTransactionModalOpen(false);
  }, []);

  const openEditBankAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdited(bankAccount)
    setIsEditAccountModalOpen(true);
  }, []);

  const closeEditBankAccountModal = useCallback(() => {
    setAccountBeingEdited(null)
    setIsEditAccountModalOpen(false);
  }, []);


  return (
    <DashboardContext.Provider
      value={{
        areaValuesVisible,
        toggleValuesVisibility,
        isNewAccountModalOpen,
        openNewAccountModal,
        closeNewAccountModal,
        isNewTransactionModalOpen,
        openNewTransactionModal,
        closeNewTransactionModal,
        newTransactionType,
        isEditAccountModalOpen,
        accountBeingEdited,
        openEditBankAccountModal,
        closeEditBankAccountModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
