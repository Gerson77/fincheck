import { FilterIcon } from "../../../../Components/icons/FilterIcon";
import { MONTHS } from "../../../../../app/config/contants";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../Components/icons/categories/CategoryIcon";
import { cn } from "../../../../../app/utils/cn";
import { useTransactionController } from "./useTransactionController";
import { Spinner } from "../../../../Components/Spinner";

import EmptyState from "../../../../../assets/Empty-state.svg";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { FiltersModal } from "./FiltersModal";
import { formatDate } from "../../../../../app/utils/formatDate";
import { EditTransactionModal } from "../../modals/EditTransactionModal";

export function Transactions() {
  const {
    areaValuesVisible,
    isInitialLoading,
    transactions,
    isLoading,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    isEditModalOpen,
    handleOpenEditModal,
    handleCloseEditModal,
    transactionBeingEdit,
  } = useTransactionController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="w-full h-full bg-gray-100 p-10 rounded-2xl flex flex-col">
      {isInitialLoading && (
        <div className="flex-1 items-center justify-center flex">
          <Spinner className="w-10 h-10" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            onApplyFilters={handleApplyFilters}
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
          />
          <header>
            <div className="flex justify-between items-center">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters("type")}
                selectedType={filters.type}
              />
              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={(swiper) => {
                  handleChangeFilters("month")(swiper.realIndex);
                }}
              >
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>
          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading && (
              <div className="flex items-center justify-center flex-col h-full">
                <Spinner className="w-10 h-10" />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex items-center justify-center flex-col h-full">
                <img src={EmptyState} alt="empty-state" />
                <p>Não encontramos nenhuma transação.</p>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                {transactionBeingEdit && (
                  <EditTransactionModal
                    open={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    transaction={transactionBeingEdit}
                  />
                )}
                {transactions.map((transaction) => (
                  <div
                    className="bg-white rounded-2xl p-4 flex gap-4 items-center justify-between"
                    key={transaction.id}
                    role="button"
                    onClick={() => handleOpenEditModal(transaction)}
                  >
                    <div className="flex-1 flex items-center gap-3">
                      <CategoryIcon
                        type={
                          transaction.type === "EXPENSE" ? "expense" : "income"
                        }
                        category={transaction.category?.icon}
                      />

                      <div>
                        <strong className="font-bold tracking-[-0.5px] block">
                          {transaction.name}
                        </strong>
                        <span className="text-sm text-gray-600">
                          {formatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "font-medium tracking-[-0.5px] block",
                        transaction.type === "EXPENSE"
                          ? "text-red-800"
                          : "text-teal-800",
                        !areaValuesVisible && "blur-sm"
                      )}
                    >
                      {transaction.type === "EXPENSE" ? "-" : "+"}{" "}
                      {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
