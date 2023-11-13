import { serverClient } from "~/app/_trpc/serverClient";

export default async function Home() {
    const hello = await serverClient.getHello();

    return (
        <div>
            <p>{hello}</p>
        </div>
    );
}
