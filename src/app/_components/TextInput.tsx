import { forwardRef } from "react";
import { cn } from "~/utils";

interface ButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: any;
}

export const TextInput = forwardRef<HTMLInputElement, ButtonProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <input
                type="text"
                className={cn(
                    "my-auto w-full rounded-sm text-center leading-8 placeholder:text-neutral-500",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
TextInput.displayName = "TextInput";
