import { ExitIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "./DropdownMenu";
import { useAuth } from "../../app/hooks/useAuth";

export function UserMenu() {
  const { signout, user } = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-50 rounded-full w-12 h-12 flex items-center justify-center border border-teal-100">
          <span className="tracking-[-0.5px] text-teal-900 font-medium select-none">
            {user?.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </DropdownMenu.Trigger>

        <DropdownMenu.Content className="w-32 mr-2">
          <DropdownMenu.Item className="flex gap-2 items-center justify-between" onSelect={signout}>
              <span>Sair</span>
              <ExitIcon className="w-4 h-4"/>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
