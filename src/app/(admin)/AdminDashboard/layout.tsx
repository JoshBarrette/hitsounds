import NavBar from "./_components/NavBar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}
