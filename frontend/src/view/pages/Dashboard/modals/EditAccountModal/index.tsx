import { Controller } from "react-hook-form";
import { Button } from "../../../../Components/Button";
import { ColorsDropdownInput } from "../../../../Components/ColorsDropdownInput";
import { Input } from "../../../../Components/Input";
import { InputCurrency } from "../../../../Components/InputCurrency";
import { Modal } from "../../../../Components/Modal";
import { Select } from "../../../../Components/Select";
import { useEditAccountModalController } from "./useEditAccountModalController";
import { TrashIcon } from "../../../../Components/icons/TrashIcon";
import { ConfirmDeleteModal } from "../../../../Components/ConfirmDeleteModal";

export function EditAccountModal() {
  const {
    isEditAccountModalOpen,
    closeEditBankAccountModal,
    handleSubmit,
    register,
    errors,
    control,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingDelete
  } = useEditAccountModalController();

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isLoadingDelete}
        onConfirm={handleDeleteAccount}
        onClose={handleCloseDeleteModal}
        title="Tem certeza que deseja excluir esta conta?"
        description="Ao excluir a conta, também serão excluídos todos os registros de
        receitas e despesas relacionados"
      />
    );
  }

  return (
    <Modal
      open={isEditAccountModalOpen}
      onClose={closeEditBankAccountModal}
      title="Editar conta"
      rightAction={
        <button
          type="button"
          onClick={handleOpenDeleteModal}
          className="w-12 h-12 hover:bg-gray-50 flex items-center justify-center rounded-full outline-none transition-colors"
        >
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      }
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

        <Button className="w-full mt-10" isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
