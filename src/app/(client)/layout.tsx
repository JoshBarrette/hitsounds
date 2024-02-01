import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { cookies } from "next/headers";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            {children}
            <Footer historyCookie={cookies().get("history")} />
        </>
    );
}
