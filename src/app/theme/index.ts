import { extendTheme, ColorMode } from "@chakra-ui/react";
import { Link } from "./link";
import { Container } from "./container";
import { Heading } from "./heading";
import { Global } from "./global";

export type Variant = {
    colorMode: ColorMode;
};

export const theme = extendTheme({
    components: {
        ...Link,
        ...Container,
        ...Heading,
    },
    styles: {
        ...Global,
    },
});
