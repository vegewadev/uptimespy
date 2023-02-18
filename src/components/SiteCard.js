import {
    Box,
    Text,
    Heading,
    Tooltip
} from "@chakra-ui/react";

import calculate24hUptimePercentage from "../utils/calculate24HourUptimePercentage";

export default function SiteCard(props) {
    return (
        <Box key={props.index} bg="#2a2733" display="flex" flexDirection={{ base: "column", lg: "row" }} p={4} rounded="xl" mb={5}>
            <Box>
                <Box display="flex" pb={2} alignContent="center" alignItems="center" flexDirection="row">
                    <Text w={16} alignItems="center" textAlign="center" color="black" fontWeight="bold" bg={props.item.status == "up" ? "green.400" : "red.400"} h={6} rounded="full" mr={2} >{calculate24hUptimePercentage(props.item)}</Text>
                    <Heading size={{ base: "sm", sm: "lg" }} >{props.item.name}</Heading>
                </Box>
                <Box>
                    {props.item.url}
                </Box>
            </Box>
            <Box display={{ base: "none", md: "block" }} ml={{ base: "none", lg: "auto" }}>
                <Box mt={5} display="flex" flexDirection="row">
                    {props.item.uptime24h.map((item, index) => {
                        return (
                            <Tooltip key={index} bg="#373342" color="white" rounded="full" label={item.up ? "Host reachable" : "Host unreachable"} placement='top'>
                                <Box bg={item.up ? "green.400" : "red.400"} h={6} px={1} rounded="full" mr={2} />
                            </Tooltip>
                        )
                    })}
                </Box>
            </Box>
        </Box>
    );
}
