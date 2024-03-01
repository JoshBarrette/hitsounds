import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "~/utils";

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    active?: boolean;
}

export const NavButton = forwardRef<HTMLButtonElement, NavButtonProps>(
    ({ href, className, active = false, ...props }, ref) => {
        return (
            <Link href={href ?? ""}>
                <button
                    className={cn(
                        "p-2 text-3xl",
                        active ? "bg-white text-black" : "text-white",
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
