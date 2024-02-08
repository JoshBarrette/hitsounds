import {
    Dispatch,
    HTMLAttributes,
    MutableRefObject,
    SetStateAction,
    createContext,
    forwardRef,
    useContext,
    useRef,
    useState,
} from "react";
import { cn } from "~/utils";

interface AccordionContextState {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    headerRef: MutableRefObject<HTMLButtonElement | null>;
    contentRef: MutableRefObject<HTMLDivElement | null>;
}

const AccordionContext = createContext<AccordionContextState | undefined>(
    undefined
);

function useAccordionContext() {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error(
            "Used Accordion Header/Body elements outside of Accordion."
        );
    }
    return context;
}

export const Accordion = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef<HTMLButtonElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const providerValues: AccordionContextState = {
        isOpen,
        setIsOpen,
        headerRef,
        contentRef,
    };

    return (
        <AccordionContext.Provider value={providerValues}>
            <div
                className={cn("overflow-hidden text-xl text-black", className)}
                ref={ref}
                {...props}
            />
        </AccordionContext.Provider>
    );
});
Accordion.displayName = "Accordion";

export const AccordionHeader = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }) => {
    const { headerRef, isOpen, setIsOpen } = useAccordionContext();
    const titleDivRounding = isOpen ? "rounded-t" : "rounded";

    return (
        <button
            className={cn(
                `w-full rounded-t bg-white px-4 py-2 ${titleDivRounding}`,
                className
            )}
            onClick={() => setIsOpen(!isOpen)}
            style={
                isOpen
                    ? undefined
                    : {
                          transitionDelay: "150ms",
                          transitionProperty: "border-radius",
                          transitionTimingFunction:
                              "cubic-bezier(0.4, 0, 0.2, 1)",
                          transitionDuration: "250ms",
                      }
            }
            {...props}
            ref={headerRef}
        />
    );
});
AccordionHeader.displayName = "AccordionHeader";

export const AccordionBody = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }) => {
    const { contentRef, isOpen } = useAccordionContext();

    const transition = {
        transition: "height 250ms ease-in-out",
    };
    const openHeight = isOpen
        ? {
              height: contentRef.current?.scrollHeight,
          }
        : { height: "0px" };

    return (
        <div
            ref={contentRef}
            className={cn("accordion-body rounded-b bg-neutral-200", className)}
            style={{
                ...transition,
                ...openHeight,
            }}
            {...props}
        />
    );
});
AccordionBody.displayName = "AccordionBody";
