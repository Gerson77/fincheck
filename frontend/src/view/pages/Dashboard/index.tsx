import { Logo } from "../../Components/Logo";
import { UserMenu } from "../../Components/UserMenu";
import { Accounts } from "./Components/Accounts";
import {
  DashboardContext,
  DashboardProvider,
} from "./Components/DashboarContext";
import { Fab } from "./Components/Fab";
import { Transactions } from "./Components/Transaction";
import { EditAccountModal } from "./modals/EditAccountModal";
import { NewAccountModal } from "./modals/NewAccountModal";
import { NewTransactionModal } from "./modals/NewTransactionModal";

export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className="h-full w-full p-4 md:px-8 md:pb-8 md:pt-6 flex flex-col gap-4">
            <header className="h-12 flex items-center justify-between">
              <Logo className="h-6 text-teal-900" />
              <UserMenu />
            </header>

            <main className="flex-1 flex flex-col md:flex-row gap-4 max-h-full md:overflow-hidden">
              <div className="w-full md:w-1/2">
                <Accounts />
              </div>

              <div className="w-full md:w-1/2 md:overflow-hidden">
                <Transactions />
              </div>
            </main>

            <Fab />
            <NewAccountModal />
            <NewTransactionModal />

            {accountBeingEdited && <EditAccountModal />}
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
}
