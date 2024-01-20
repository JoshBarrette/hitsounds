export default function PageSelector(props: { size: number; callback: (n: number) => void }) {
    const thingToMapOver = new Array<number>(props.size).fill(1);
    return (
        <div className="m-auto flex">
            {thingToMapOver.map((_, key) => (
                <button
                    className="mx-1 rounded-md bg-cyan-500 px-3 py-1 text-lg transition-all hover:bg-cyan-600 active:bg-cyan-400"
                    key={key}
                    onClick={() => props.callback(key + 1)}
                >
                    {key + 1}
                </button>
            ))}
        </div>
    );
}
