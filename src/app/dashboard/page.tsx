"use client";

import { Flex, Stack, Heading, Box, Text, Container, useColorModeValue } from "@chakra-ui/react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, ReferenceLine } from "recharts";
import moment from "moment";

import { trpc } from "../_trpc/client";

const Dashboard = () => {
    const { data: user, isLoading } = trpc.getUser.useQuery();

    const backgroundColor = useColorModeValue("gray.50", "gray.800");

    const data = user?.weights.map((weight) => ({
        weight: weight.weight,
        logDate: moment(weight.logDate).format("MMM Do"),
    }));

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <Box bg={backgroundColor} w={200} p={3}>
                    <strong>
                        <Text fontSize="xl">{`${label}`}</Text>
                    </strong>
                    <Text>
                        {payload[0].value} {user?.settings.weightLb ? "lb" : "kg"}
                    </Text>
                </Box>
            );
        }
    };

    return (
        !isLoading && (
            <>
                <Heading textAlign="center" mt={4} variant="title">
                    Dashboard
                </Heading>

                <Flex justify="center">
                    <Container variant="default" maxW="2xl">
                        <Stack spacing={4} height={400}>
                            <Heading size="md" textAlign="center" variant="title">
                                Weight
                            </Heading>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    width={500}
                                    height={400}
                                    data={data}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <XAxis dataKey="logDate" />
                                    <YAxis
                                        domain={[
                                            (data?.length &&
                                                Math.min(
                                                    ...data.map((i) => Number(i?.weight)),
                                                    user?.settings.goalWeight || 0
                                                )) ||
                                                0,
                                        ]}
                                    />
                                    <Tooltip content={CustomTooltip} />
                                    <ReferenceLine
                                        label="Goal"
                                        y={user?.settings.goalWeight}
                                        stroke="green"
                                        strokeDasharray="3 3"
                                    />
                                    <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </Stack>
                    </Container>
                </Flex>
            </>
        )
    );
};

export default withPageAuthRequired(Dashboard, { returnTo: "/" });
