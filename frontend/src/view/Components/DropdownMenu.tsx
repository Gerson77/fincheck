import * as RadixUIDropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "../../app/utils/cn";

function DropdownMenuRoot({ children }: { children: React.ReactNode }) {
  return <RadixUIDropdownMenu.Root>{children}</RadixUIDropdownMenu.Root>;
}

function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  return (
    <RadixUIDropdownMenu.Trigger className="outline-none" asChild>
      {children}
    </RadixUIDropdownMenu.Trigger>
  );
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
}

function DropdownMenuContent({
  children,
  className,
}: DropdownMenuContentProps) {
  return (
    <RadixUIDropdownMenu.Portal>
      <RadixUIDropdownMenu.Content
        className={cn(
          "rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-[99]",
          'data-[side=bottom]:animate-slideUpAndFade',
          'data-[side=top]:animate-slideUpAndFade',
          className
        )}
      >
        {children}
      </RadixUIDropdownMenu.Content>
    </RadixUIDropdownMenu.Portal>
  );
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  onSelect?(): void;
}

function DropdownMenuItem({ children, className, onSelect }: DropdownMenuItemProps) {
  return (
    <RadixUIDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        "min-h-[40px] outline-none flex items-center px-4 py-2 text-sm text-gray-800 data-[highlighted]:bg-gray-50 rounded-2xl transition-colors cursor-pointer",
        className
      )}
    >
      {children}
    </RadixUIDropdownMenu.Item>
  );
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};
