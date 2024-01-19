import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "~/utils";

export const Select = forwardRef<
    HTMLSelectElement,
    SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => {
    return (
        <select
            className={cn(
                "text-md my-auto mr-2 w-24 rounded-sm bg-cyan-900 p-1 font-sans font-medium text-white",
                className
            )}
            {...props}
            ref={ref}
        />
    );
});
Select.displayName = "Select";
