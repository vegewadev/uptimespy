import React from "react";
import Axios from "axios";
import Navbar from "../components/Navbar";

import {
    Box,
    Button,
    Heading,
    Text,
    Tooltip
} from "@chakra-ui/react";

import {
    AddIcon
} from "@chakra-ui/icons";

function DashboardRoute() {

    const [fetchedSites, setFetchedSites] = React.useState([]);

    React.useEffect(() => {
        Axios.get("http://localhost:5000/api/sites", {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        }).then((res) => {
            setFetchedSites(res.data.sites);
        }).catch((err) => {

        });
    }, []);


    /**
     * Calculates the uptime percentage of the last 24 hours
     * @param {Object} item
     * @returns {String}
     */
    function calculate24hUptimePercentage(item) {
        let up = 0;
        let down = 0;
        item.uptime24h.forEach((item) => {
            if (item.up) {
                up++;
            } else {
                down++;
            }
        });
        return Math.round((up / (up + down)) * 100) + "%";
    }

    React.useEffect(() => {
        document.title = "UPTIMESPY | Dashboard";


        Axios.post("http://localhost:5000/api/authenticate", null, {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        }).then((res) => {

        }).catch((err) => {
            window.location.href = "/";
        });

    }, []);


    return (
        <Box>
            <Navbar />
            <Box pt={24}>
                <Button bg="#2a2733" _hover={{ bg: "#373342" }} mx={10} my={5} leftIcon={<AddIcon />} >
                    Add new Monitor
                </Button>
                <Box display="flex" mr={20} flexDirection="column">
                    <Box mx={10} my={5} w="100%">
                        <Heading>Monitors</Heading>
                        <Box bg="#24212b" mt={5} p={8} pb={3} rounded="xl">
                            {fetchedSites.map((item, index) => {
                                return (
                                    <Box key={index} bg="#2a2733" display="flex" flexDirection={{ base: "column", lg: "row" }} p={4} rounded="xl" mb={5}>
                                        <Box>
                                            <Box display="flex" pb={2} alignContent="center" alignItems="center" flexDirection="row">
                                                <Text w={24} alignItems="center" textAlign="center" color="black" fontWeight="bold" bg={item.status == "up" ? "green.400" : "red.400"} h={6} px={5} rounded="full" mr={2} >{calculate24hUptimePercentage(item)}</Text>
                                                <Heading size={{ base: "sm", sm: "lg" }} >{item.name}</Heading>
                                            </Box>
                                            <Box>
                                                {item.url}
                                            </Box>
                                        </Box>
                                        <Box display={{ base: "none", md: "block" }} ml={{ base: "none", lg: "auto" }}>
                                            <Box mt={5} display="flex" flexDirection="row">
                                                {item.uptime24h.map((item, index) => {
                                                    return (
                                                        <Tooltip bg="#373342" color="white" rounded="full" label={item.up ? "Host reachable" : "Host unreachable"} placement='top'>
                                                            <Box key={index} bg={item.up ? "green.400" : "red.400"} h={6} px={1} rounded="full" mr={2} />
                                                        </Tooltip>
                                                    )
                                                })}
                                            </Box>
                                        </Box>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box >
    );
}

export default DashboardRoute;
