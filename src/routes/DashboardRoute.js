import React from "react";
import Axios from "axios";
import Navbar from "../components/Navbar";
import {
    Box,
    Button,
    Heading,
} from "@chakra-ui/react";

import {
    AddIcon
} from "@chakra-ui/icons";

import SiteCard from "../components/SiteCard";

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
            window.location.href = "/";
        });
    }, []);




    React.useEffect(() => {
        document.title = "UPTIMESPY | Dashboard";
        Axios.post("http://localhost:5000/api/authenticate", null, {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        }).catch((err) => {
            window.location.href = "/";
        });
    }, []);


    return (
        <Box>
            <Navbar />
            <Box pt={24}>
                <Button rounded="xl" bg="#2a2733" _hover={{ bg: "#373342" }} mx={10} my={5} leftIcon={<AddIcon />} >
                    Add new Monitor
                </Button>
                <Box display="flex" mr={20} flexDirection="column">
                    <Box mx={10} my={5} w="100%">
                        <Heading>Monitors</Heading>
                        <Box bg="#24212b" mt={5} p={8} pb={3} rounded="xl">
                            {fetchedSites.map((item, index) => {
                                return (
                                    <SiteCard key={index} index={index} item={item} />
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
