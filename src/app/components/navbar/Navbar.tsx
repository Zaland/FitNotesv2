"use client";

import { Box, Flex, Button, useColorModeValue, Stack, useColorMode } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

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
                            <Flex alignItems="center" justifyContent="space-between">
                                <Link variant="default" href="/api/auth/login">
                                    Login
                                </Link>
                            </Flex>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
};
