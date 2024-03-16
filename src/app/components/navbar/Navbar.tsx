"use client";

import { Box, Flex, Button, useColorModeValue, Stack, useColorMode } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { usePathname } from "next/navigation";

const paths = [
    {
        route: "/auth/login",
        label: "Login",
    },
    {
        route: "/auth/signup",
        label: "Signup",
    },
];

export const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const pathname = usePathname();

    return (
        <>
            <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    <Box>FitNotes</Box>

                    <Flex alignItems="center">
                        <Stack direction="row" spacing={7}>
                            <Button onClick={toggleColorMode} bg="none">
                                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                            </Button>

                            {paths.map((path) => (
                                <Flex key={path.label} alignItems="center" justifyContent="space-between">
                                    <Link variant={pathname === path.route ? "active" : "default"} href={path.route}>
                                        {path.label}
                                    </Link>
                                </Flex>
                            ))}
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
};
