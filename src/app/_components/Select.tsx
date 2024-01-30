import { OptionHTMLAttributes, SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "~/utils";

export const Select = forwardRef<
    HTMLSelectElement,
    SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => {
    return (
        <select
            className={cn(
                "text-md my-auto rounded-sm p-1.5 font-sans font-medium text-black bg-white",
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
