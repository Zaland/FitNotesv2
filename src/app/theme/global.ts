import { Variant } from ".";

export const Global = {
    global: ({ colorMode }: Variant) => ({
        body: {
            background: colorMode === "light" ? "gray.50" : "gray.800",
        },
    }),
};
