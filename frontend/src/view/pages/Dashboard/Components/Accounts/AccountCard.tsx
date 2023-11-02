import { BankAccount } from "../../../../../app/entities/BankAccount";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../Components/icons/BankAccountTypeIcon";
import { useDashboard } from "../DashboarContext/useDashboard";

interface AccountCardProps {
  data: BankAccount;
}

export function AccountCard({ data }: AccountCardProps) {
  const { name, color, currentBalance, type } = data
  const { areaValuesVisible, openEditBankAccountModal } = useDashboard()
  return (
    <div
      className="bg-white p-4 rounded-2xl h-[200px] flex justify-between flex-col border-teal-950 border-b-4"
      style={{ borderColor: color }}
      role="button"
      onClick={() => openEditBankAccountModal(data)}
    >
      <div>
        <BankAccountTypeIcon type={type} />
        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </div>

      <div>
        <span
          className={cn(
            "text-gray-800 font-medium tracking-[-0.5px] mt-4 block",
            !areaValuesVisible && 'blur-sm'
          )}>
          {formatCurrency(currentBalance)}
        </span>
        <small className="text-gray-600 text-sm">Saldo Atual</small>
      </div>
    </div>
  );
}
