import NavBar from "./_components/NavBar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen flex-col">
            <NavBar />

            <div className="flex-1">{children}</div>
        </div>
    );
}
