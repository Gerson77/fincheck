import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../../Components/Modal";
import { Button } from "../../../../../Components/Button";
import { useFiltersModalController } from "./useFiltersModalController";
import { cn } from "../../../../../../app/utils/cn";

interface FiltersModalProps {
  open: boolean;
  onClose(): void;
  onApplyFilters(filters: {
    bankAccountId: string | undefined;
    year: number;
  }): void;
}

export function FiltersModal({
  open,
  onClose,
  onApplyFilters,
}: FiltersModalProps) {
  const {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
    accounts,
  } = useFiltersModalController();

  return (
    <Modal open={open} title="Filtros" onClose={onClose}>
      <div>
        <span className="text-lg font-bold tracking-[-1px] text-gray-800">
          Conta
        </span>
        <div className="space-y-2 mt-2">
          {accounts.map((account) => (
            <button
              key={account.id}
              onClick={() => handleSelectBankAccount(account.id)}
              className={cn(
                "p-2 rounded-2xl w-full text-left text-gray-800  hover:bg-gray-50 transition-colors",
                account.id === selectedBankAccountId && "!bg-gray-200"
              )}
            >
              {account.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg font-bold tracking-[-1px] text-gray-800">
          Ano
        </span>
        <div className="mt-2 w-52 flex items-center justify-between">
          <button
            className="w-12 h-12 flex items-center justify-center"
            onClick={() => handleChangeYear(-1)}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <span className="flex-1 text-center text-sm font-medium tracking-[-0.5px]">
            {selectedYear}
          </span>
          <button
            className="w-12 h-12 flex items-center justify-center"
            onClick={() => handleChangeYear(1)}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <Button
        className="w-full mt-10"
        onClick={() =>
          onApplyFilters({
            bankAccountId: selectedBankAccountId,
            year: selectedYear,
          })
        }
      >
        Aplicar filtros
      </Button>
    </Modal>
  );
}
