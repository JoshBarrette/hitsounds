import { NavButton } from "~/app/_components/NavButton";

export default function NavBar() {
    return (
        <nav className="flex bg-neutral-800 text-center">
            <p className="bg-cyan-500 p-2 text-3xl text-black">
                Admin Dashboard
            </p>
            
            <NavButton href="/AdminDashboard/Users">Uploaders</NavButton>
            <NavButton href="/AdminDashboard/Sounds">Sounds</NavButton>
            <NavButton href="/" className="absolute right-0">
                Back to Home
            </NavButton>
        </nav>
    );
}
