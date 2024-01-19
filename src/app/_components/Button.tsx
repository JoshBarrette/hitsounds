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
                    "active:bg-cyan-400; rounded-md bg-cyan-500 px-3 py-2 font-medium text-black transition-all hover:bg-cyan-600",
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
