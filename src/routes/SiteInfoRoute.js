import React from "react";
import Axios from "axios";
import Navbar from "../components/Navbar";
import calculate24HourUptimePercentage from "../utils/calculate24HourUptimePercentage";
import {
    Box,
    Text,
    Heading,
    Button
} from "@chakra-ui/react";
import {
    useParams
} from "react-router-dom";
import {
    DeleteIcon,
    EditIcon
} from "@chakra-ui/icons";

function SiteInfoRoute() {

    const [fetchedSite, setFetchedSite] = React.useState([]);
    const { id } = useParams();

    React.useEffect(() => {
        Axios.get(`http://localhost:5000/api/site/${id}`, {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        }).then((res) => {
            setFetchedSite(res.data.site);
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

    function getDateFromRemainingDays(days) {
        days = days.split(" ")[0];
        const date = new Date();
        date.setDate(date.getDate() + parseInt(days));
        return date.toDateString();
    }


    return (
        <Box>
            <Navbar />
            <Box pt={24}>
                <Box display="flex" mr={20} flexDirection="column">
                    <Box mx={10} my={5} w="100%">
                        <Heading>{fetchedSite.name ? fetchedSite.name : "Loading..."}</Heading>
                        <Heading fontWeight="normal" size="md" color="gray.300">{fetchedSite.url ? fetchedSite.url : "Loading..."}</Heading>
                        <Box gap={3} display="flex" flexDirection="row">
                            <Button mt={5} rounded="xl" bg="#2a2733" _hover={{ bg: "#373342" }} leftIcon={<DeleteIcon />} >Delete</Button>
                            <Button mt={5} rounded="xl" bg="#2a2733" _hover={{ bg: "#373342" }} leftIcon={<EditIcon />} >Edit</Button>

                        </Box>
                        <Box gap={10} alignItems="center" textAlign="center" alignContent="center" justifyContent="center" display="flex" flexDirection={{ base: "column", md: "row" }} bg="#24212b" mt={5} p={8} rounded="xl">
                            <Box alignContent="center" alignItems="center" textAlign="center">
                                <Heading fontWeight="normal" size="lg">Response</Heading>
                                <Text pb={2} color="gray.300">(current)</Text>
                                <Heading as="p" fontWeight="normal" size="md">{fetchedSite.lastResponseTime ? fetchedSite.lastResponseTime : "Loading..."}</Heading>
                            </Box>
                            <Box alignContent="center" alignItems="center" textAlign="center">
                                <Heading fontWeight="normal" size="lg">Uptime</Heading>
                                <Text pb={2} color="gray.300">(24 Hours)</Text>
                                <Heading as="p" fontWeight="normal" size="md">{fetchedSite.uptime24h ? calculate24HourUptimePercentage(fetchedSite) : "Loading..."}</Heading>
                            </Box>
                            <Box alignContent="center" alignItems="center" textAlign="center">
                                <Heading fontWeight="normal" size="lg">SSL Expiration</Heading>
                                <Text pb={2} color="gray.300">({fetchedSite.certificateExpires ? getDateFromRemainingDays(fetchedSite.certificateExpires) : null})</Text>
                                <Heading as="p" fontWeight="normal" size="md">in {fetchedSite.certificateExpires ? fetchedSite.certificateExpires : "Loading..."}</Heading>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box >
    );
}

export default SiteInfoRoute;
