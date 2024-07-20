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
    Link,
    useColorModeValue,
    useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { MoonIcon, SunIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useUser } from "@auth0/nextjs-auth0/client";

export const AuthNavbar = () => {
    const { user } = useUser();
    const { colorMode, toggleColorMode } = useColorMode();
    const path = usePathname();

    const navBackgroundColor = useColorModeValue("gray.100", "gray.900");

    return (
        <Box bg={navBackgroundColor} px={4}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Flex alignItems="left" gap={12}>
                    <Link as={NextLink} href="/dashboard" variant={path === "/dashboard" ? "active" : "default"}>
                        FitNotes
                    </Link>
                    <Link
                        as={NextLink}
                        href="/dashboard/weight"
                        variant={path === "/dashboard/weight" ? "active" : "default"}
                    >
                        Weight
                    </Link>
                </Flex>

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
