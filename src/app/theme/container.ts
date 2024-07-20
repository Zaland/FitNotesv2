import { Variant } from ".";

export const Container = {
    Container: {
        variants: {
            default: ({ colorMode }: Variant) => ({
                width: "full",
                maxWidth: "lg",
                backgroundColor: colorMode === "light" ? "white" : "gray.700",
                rounded: "xl",
                boxShadow: "lg",
                padding: 6,
                marginY: 12,
            }),
        },
    },
};
