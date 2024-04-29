import { extendTheme, ColorMode } from "@chakra-ui/react";

type Variant = {
    colorMode: ColorMode;
};

export const theme = extendTheme({
    components: {
        Link: {
            variants: {
                default: ({ colorMode }: Variant) => ({
                    color: "green.400",
                    padding: "8px 12px",
                    borderRadius: "var(--chakra-radii-md)",
                    fontWeight: 800,
                    _hover: {
                        textDecoration: "none",
                        backgroundColor: colorMode === "light" ? "gray.200" : "whiteAlpha.200",
                    },
                }),
                active: ({ colorMode }: Variant) => ({
                    color: "green.400",
                    padding: "8px 12px",
                    borderRadius: "var(--chakra-radii-md)",
                    backgroundColor: colorMode === "light" ? "gray.200" : "gray.700",
                    fontWeight: 800,
                    _hover: {
                        textDecoration: "none",
                    },
                }),
            },
        },
    },
});
