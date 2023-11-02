import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../Components/DropdownMenu";
import { BankAccountIcon } from "../../../../Components/icons/BankAccountIcon";
import { CategoryIcon } from "../../../../Components/icons/categories/CategoryIcon";
import { useDashboard } from "../DashboarContext/useDashboard";

export function Fab() {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard()
  return (
    <div className="fixed bottom-4 right-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className=" bg-teal-900 text-white rounded-full w-12 h-12 flex items-center justify-center">
            <PlusIcon className="w-6 h-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="mr-2">
          <DropdownMenu.Item className="gap-2" onSelect={() => openNewTransactionModal('EXPENSE')}>
            <CategoryIcon type="expense" />
            Nova Despesa
          </DropdownMenu.Item>
          <DropdownMenu.Item className="gap-2" onSelect={() => openNewTransactionModal('INCOME')}>
            <CategoryIcon type="income" />
            Nova Receita
          </DropdownMenu.Item>
          <DropdownMenu.Item className="gap-2" onSelect={openNewAccountModal}>
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
