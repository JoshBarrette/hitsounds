export function getSoundType(
    type: string | undefined | null
): "hit" | "kill" | undefined {
    return type === "kill" ? type : type === "hit" ? type : undefined;
}
