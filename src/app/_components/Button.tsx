import { forwardRef } from "react";
import { cn } from "~/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: any;
    href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, href, className, ...props }, ref) => {
        return (
            <button
                className={cn(
                    "rounded-3xl border px-3 py-2 font-medium text-white transition-all hover:border-neutral-400 active:border-neutral-400 disabled:border-neutral-950",
                    className
                )}
                {...props}
                ref={ref}
            >
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";
