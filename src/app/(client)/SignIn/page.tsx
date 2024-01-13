import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="flex">
            <div className="mx-auto my-64">
                <SignIn />
            </div>
        </div>
    );
}
