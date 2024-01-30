import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "~/utils";

export const TextInput = forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
    return (
        <input
            type="text"
            className={cn(
                "my-auto w-full rounded-sm text-center leading-8 text-black placeholder:text-neutral-500",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
TextInput.displayName = "TextInput";
