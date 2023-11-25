import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./index";

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type getSoundOutputArray = RouterOutput["search"]["getNSounds"];
export type getSoundOutputSingle = RouterOutput["search"]["getNSounds"][0];
