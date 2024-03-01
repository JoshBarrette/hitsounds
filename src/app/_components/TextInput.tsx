import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "~/utils";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    useShortcut?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    ({ className, useShortcut = false, ...props }, ref) => {
        return (
            <div className="relative flex w-full items-center justify-center">
                <input
                    type="text"
                    className={cn(
                        "my-auto w-full rounded-sm text-center leading-8 text-black ring-0 ring-neutral-400 transition-all placeholder:text-neutral-500 focus:outline-none focus:ring",
                        className
                    )}
                    ref={ref}
                    {...props}
                />

                {useShortcut && (
                    <div className="absolute right-1 rounded border border-neutral-700 bg-neutral-300 px-1.5 py-0.5 text-sm text-neutral-800">
                        CtrlK
                    </div>
                )}
            </div>
        );
    }
);
TextInput.displayName = "TextInput";
