import { forwardRef } from "react";
import { cn } from "~/utils";
import Image from "next/image";

interface SearchButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    width: number;
}

export const SearchButton = forwardRef<HTMLButtonElement, SearchButtonProps>(
    ({ children, className, width, ...props }, ref) => {
        return (
            <button
                className={cn(
                    "rounded-r-lg border-l border-black bg-neutral-400 p-1",
                    className
                )}
                {...props}
                ref={ref}
            >
                <Image
                    src="/search-svgrepo-com.svg"
                    alt="search"
                    width={width}
                    height="1"
                />
                {children}
            </button>
        );
    }
);
SearchButton.displayName = "SearchButton";
