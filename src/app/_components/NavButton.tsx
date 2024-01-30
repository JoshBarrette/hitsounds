import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "~/utils";

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: any;
    href?: string;
}

export const NavButton = forwardRef<HTMLButtonElement, NavButtonProps>(
    ({ children, href, className, ...props }, ref) => {
        return (
            <Link href={href ?? ""}>
                <button
                    className={cn(
                        "bg-white p-2 text-3xl text-black transition-all",
                        className
                    )}
                    {...props}
                    ref={ref}
                >
                    {children}
                </button>
            </Link>
        );
    }
);
NavButton.displayName = "NavButton";
