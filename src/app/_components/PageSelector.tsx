import { forwardRef } from "react";
import { Button } from "./Button";

interface PageButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    pageNum: number;
    isCurrentPage?: boolean;
    setPage: (n: number) => void;
}

export default function PageSelector(props: {
    size: number;
    currentPage: number;
    setPage: (n: number) => void;
}) {
    const hasLeftPages = props.currentPage > 1;
    const hasRightPages = props.currentPage < props.size;

    const PageButton = forwardRef<HTMLButtonElement, PageButtonProps>(
        ({ setPage, pageNum, isCurrentPage, ...props }, ref) => {
            return (
                <Button
                    className={`rounded-md px-3 py-1 ${
                        isCurrentPage ? "text-cyan-500" : ""
                    }`}
                    onClick={() => setPage(pageNum)}
                    ref={ref}
                    {...props}
                />
            );
        }
    );
    PageButton.displayName = "PageButton";

    if (props.size <= 1) {
        return null;
    }

    return (
        <div className="m-auto flex space-x-2 text-lg">
            {hasLeftPages && (
                <>
                    <PageButton setPage={props.setPage} pageNum={1}>
                        {"<<"}
                    </PageButton>
                    <PageButton
                        setPage={props.setPage}
                        pageNum={props.currentPage - 1}
                    >
                        {props.currentPage - 1}
                    </PageButton>
                </>
            )}

            <PageButton setPage={props.setPage} isCurrentPage pageNum={props.currentPage}>
                {props.currentPage}
            </PageButton>

            {hasRightPages && (
                <>
                    <PageButton
                        setPage={props.setPage}
                        pageNum={props.currentPage + 1}
                    >
                        {props.currentPage + 1}
                    </PageButton>
                    <PageButton setPage={props.setPage} pageNum={props.size}>
                        {">>"}
                    </PageButton>
                </>
            )}
        </div>
    );
}
