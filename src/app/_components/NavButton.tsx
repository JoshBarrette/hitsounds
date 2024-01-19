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
                        "p-2 text-3xl text-white transition-all hover:bg-cyan-500 hover:text-black",
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
