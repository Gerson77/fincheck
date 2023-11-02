import { Controller } from "react-hook-form";
import { Button } from "../../../../Components/Button";
import { ColorsDropdownInput } from "../../../../Components/ColorsDropdownInput";
import { Input } from "../../../../Components/Input";
import { InputCurrency } from "../../../../Components/InputCurrency";
import { Modal } from "../../../../Components/Modal";
import { Select } from "../../../../Components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal() {
  const {
    closeNewAccountModal,
    isNewAccountModalOpen,
    handleSubmit,
    register,
    errors,
    control,
    isLoading,
  } = useNewAccountModalController();
  return (
    <Modal
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
      title="Nova conta"
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-1px] text-xs">Saldo</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-1px] text-lg">R$</span>
            <Controller
              control={control}
              name="initialBalance"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da conta"
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            control={control}
            name="type"
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                onChange={onChange}
                value={value}
                error={errors.type?.message}
                options={[
                  {
                    value: "INVESTMENT",
                    label: "Investimento",
                  },
                  {
                    value: "CHECKING",
                    label: "Conta corrent",
                  },
                  {
                    value: "CASH",
                    label: "Dinheiro físico",
                  },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>

        <Button className="w-full mt-10" isLoading={isLoading}>Criar</Button>
      </form>
    </Modal>
  );
}
