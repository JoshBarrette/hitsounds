import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "~/utils";

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    inactive?: boolean;
}

export const NavButton = forwardRef<HTMLButtonElement, NavButtonProps>(
    ({ href, className, inactive = false, ...props }, ref) => {
        return (
            <Link href={href ?? ""}>
                <button
                    className={cn(
                        inactive
                            ? "p-2 text-3xl text-white transition-all hover:bg-white hover:text-black"
                            : "bg-white p-2 text-3xl text-black transition-all",
                        className
                    )}
                    {...props}
                    ref={ref}
                />
            </Link>
        );
    }
);
NavButton.displayName = "NavButton";
