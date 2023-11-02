import * as RadixDialog from "@radix-ui/react-dialog";
import { cn } from "../../app/utils/cn";
import { Cross2Icon } from "@radix-ui/react-icons";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  title: string;
  rightAction?: React.ReactNode;
  onClose?(): void;
}

export function Modal({ children, open, title, rightAction, onClose }: ModalProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onClose}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          className={cn(
            "fixed inset-0 bg-black/80 z-50 backdrop-blur-sm",
            "data-[state=open]:animate-overlayShow"
          )}
        />

        <RadixDialog.Content
          className={cn(
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl z-[51] outline-none shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-full max-w-[400px]",
            "data-[state=open]:animate-contentShow"
          )}
        >
          <header className="h-12 flex items-center justify-between text-gray-800">
            <button
              className="w-12 h-12 hover:bg-gray-50 flex items-center justify-center rounded-full outline-none"
              onClick={onClose}
            >
              <Cross2Icon className="w-6 h-6" />
            </button>
            <span className="text-lg font-bold tracking-[-1px]">{title}</span>
            <div className="w-12 h-12 flex items-center justify-center">
              {rightAction}
            </div>
          </header>
          <div>{children}</div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
