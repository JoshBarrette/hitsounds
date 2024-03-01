import { OptionHTMLAttributes, SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "~/utils";

export const Select = forwardRef<
    HTMLSelectElement,
    SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => {
    return (
        <select
            className={cn(
                "text-md my-auto rounded-sm bg-white p-1.5 font-sans font-medium text-black ring-0 ring-neutral-400 transition-all focus:ring",
                className
            )}
            {...props}
            ref={ref}
        />
    );
});
Select.displayName = "Select";

export const Option = forwardRef<
    HTMLOptionElement,
    OptionHTMLAttributes<HTMLOptionElement>
>(({ className, ...props }, ref) => {
    return (
        <option
            className={cn("font-sans font-medium", className)}
            ref={ref}
            {...props}
        />
    );
});
Option.displayName = "Option";
