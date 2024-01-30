import { AudioHTMLAttributes, SourceHTMLAttributes, forwardRef } from "react";
import { cn } from "~/utils";

export const Audio = forwardRef<
    HTMLAudioElement,
    AudioHTMLAttributes<HTMLAudioElement>
>(({ className, ...props }, ref) => {
    return (
        <audio
            controls
            className={cn("my-auto h-10 rounded-lg text-white", className)}
            ref={ref}
            {...props}
        />
    );
});
Audio.displayName = "Audio";

export const Source = forwardRef<
    HTMLSourceElement,
    SourceHTMLAttributes<HTMLSourceElement>
>(({ type, ...props }, ref) => {
    return <source ref={ref} type="audio/wav" {...props} />;
});
Source.displayName = "Source";
