import { extendTheme, ColorMode } from "@chakra-ui/react";

type Variant = {
    colorMode: ColorMode;
};

export const theme = extendTheme({
    components: {
        Link: {
            variants: {
                default: ({ colorMode }: Variant) => ({
                    color: colorMode === "light" ? "gray.900" : "gray.300",
                    padding: "8px 12px",
                    borderRadius: "var(--chakra-radii-md)",
                    _hover: {
                        textDecoration: "none",
                        backgroundColor: colorMode === "light" ? "gray.200" : "whiteAlpha.300",
                    },
                }),
                active: ({ colorMode }: Variant) => ({
                    color: colorMode === "light" ? "gray.900" : "gray.300",
                    padding: "8px 12px",
                    borderRadius: "var(--chakra-radii-md)",
                    backgroundColor: colorMode === "light" ? "gray.300" : "gray.700",
                    _hover: {
                        textDecoration: "none",
                    },
                }),
            },
        },
    },
});
