"use client";

import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text,
    HStack,
    useColorModeValue,
    useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { MoonIcon, SunIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useUser } from "@auth0/nextjs-auth0/client";

export const AuthNavbar = () => {
    const { user } = useUser();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Box as={NextLink} href="/dashboard">
                    FitNotes
                </Box>

                <Flex alignItems="center" gap={7}>
                    <Button onClick={toggleColorMode} bg="none">
                        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    </Button>

                    <Menu>
                        <MenuButton py={2} maxW={200} overflow="elipse">
                            <HStack>
                                <Avatar
                                    size={"sm"}
                                    bg={colorMode === "light" ? "black" : "gray"}
                                    src={user?.picture || ""}
                                />
                                <Text fontSize="sm" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                                    {user?.name || ""}
                                </Text>
                                <Box display={{ base: "none", md: "flex" }}>
                                    <ChevronDownIcon />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList alignItems="center">
                            <MenuItem as={NextLink} href="/dashboard/settings">
                                Settings
                            </MenuItem>
                            <MenuItem as={NextLink} href="/api/auth/logout">
                                Logout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Box>
    );
};
