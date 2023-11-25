import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./index";

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

type getSoundOutputArray = RouterOutput["search"]["getNSounds"];
type getSoundOutputSingle = RouterOutput["search"]["getNSounds"][0];
