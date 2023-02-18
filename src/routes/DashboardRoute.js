import React from "react";
import Axios from "axios";
import Navbar from "../components/Navbar";

import {
    Box,
    Button,
    Heading,
    Text
} from "@chakra-ui/react";

import {
    AddIcon
} from "@chakra-ui/icons";

function DashboardRoute() {

    let dummyData = [
        {
            name: "Vin's Portfolio",
            url: "https://vin.rocks",
            status: "up",
            uptime: "100%",
            downtime: "0%",
            lastChecked: "2021-03-01 12:00:00",
            lastResponseTime: "0.5s",
            lastResponseCode: "200",
            lastResponseSize: "1.5MB",
            uptime24h: [
                {
                    up: false,
                },
                {
                    up: true,
                },
                {
                    up: true,
                },
                {
                    up: true,
                },
                {
                    up: true,
                },
                {
                    up: true,
                },
                {
                    up: true,
                },
                {
                    up: true,
                },
                {
                    up: true,
                },
                {
                    up: true,
                },
                {
                    up: true,
                },
                {
                    up: true,
                },
                {
                    up: false,
                },
                {
                    up: false,
                },
                {
                    up: true,
                },
                {
                    up: true,
                },
                {
                    up: true,
                },
                {
                    up: true,
                },
                {
                    up: true,
                },
                {
                    up: true,
                },
                {
                    up: true,
                },
                {
                    up: true,
                },
                {
                    up: true,
                },
                {
                    up: true,
                },

            ]
        }
    ]

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
                <Button mx={10} my={5} leftIcon={<AddIcon />} >
                    Add new Monitor
                </Button>
                <Box display="flex" mr={20} flexDirection="column">
                    <Box mx={10} my={5} w="100%">
                        <Heading>Monitors</Heading>
                        <Box bg="#24212b" mt={5} p={8} rounded="xl">
                            {dummyData.map((item, index) => {
                                return (
                                    <Box key={index} bg="#2a2733" display="flex" flexDirection="row" p={4} rounded="xl" my={2}>
                                        <Box>
                                            <Box display="flex" alignContent="center" alignItems="center" flexDirection="row">
                                                <Text color="black" fontWeight="bold" bg={item.status == "up" ? "green.400" : "red.400"} h={6} px={5} rounded="full" mr={2} >{calculate24hUptimePercentage(item)}</Text>
                                                <Heading size="lg" >{item.name}</Heading>
                                            </Box>
                                            <Box>
                                                {item.url}
                                            </Box>
                                        </Box>
                                        <Box ml="auto">
                                            <Box mt={5} display="flex" flexDirection="row">
                                                {item.uptime24h.map((item, index) => {
                                                    return (
                                                        <Box key={index} bg={item.up ? "green.400" : "red.400"} h={6} px={1} rounded="full" mr={2} />
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
        </Box>
    );
}

export default DashboardRoute;
