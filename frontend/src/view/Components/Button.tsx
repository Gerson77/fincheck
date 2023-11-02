import { ComponentProps } from "react";
import { Spinner } from "./Spinner";
import { cn } from "../../app/utils/cn";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
  variant?: 'danger' | 'ghost'
}

export function Button({ className, isLoading, disabled, children, variant, ...props}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 px-6 h-12 rounded-2xl font-medium text-white disabled:text-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center',
        variant === 'danger' && 'bg-red-900 hover:bg-red-800',
        variant === 'ghost' &&  'bg-transparent hover:bg-gray-800/5 text-gray-800 border border-gray-800',
        className,
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner className="w-6 h-6" />}
    </button>
  );
}
