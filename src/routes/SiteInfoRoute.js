import React from "react";
import Axios from "axios";
import Navbar from "../components/Navbar";
import calculate24HourUptimePercentage from "../utils/calculate24HourUptimePercentage";
import getDateFromRemainingDays from "../utils/getDateFromRemainingDays";
import {
    Box,
    Text,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import {
    useParams
} from "react-router-dom";
import {
    DeleteIcon,
    EditIcon
} from "@chakra-ui/icons";

import { useDisclosure } from "@chakra-ui/react"

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
    const { isOpen: DeleteModalIsOpen, onOpen: DeleteModalOnOpen, onClose: DeleteModalOnClose } = useDisclosure()

    const initialRefDeleteModal = React.useRef(null)
    const finalRefDeleteModal = React.useRef(null)


    const [deleteInput, setDeleteInput] = React.useState("");

    const handleDeleteInput = (e) => {
        setDeleteInput(e.target.value);
    }

    const handleDelete = () => {
        Axios.delete(`http://localhost:5000/api/site/${id}`, {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        }).then((res) => {
            window.location.href = "/dashboard";
        }).catch((err) => {
            window.location.href = "/";
        });
    }

    return (
        <Box>
            <Navbar />
            <Modal
                initialFocusRef={initialRefDeleteModal}
                finalFocusRef={finalRefDeleteModal}
                isOpen={DeleteModalIsOpen}
                onClose={DeleteModalOnClose}

            >
                <ModalOverlay />
                <ModalContent
                    bg="#24212b">
                    <ModalHeader>Delete Site Monitor</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <FormControl>
                            <FormLabel>Type "<span style={{ fontWeight: "bolder" }} >{fetchedSite.name}</span>" to delete the site monitor</FormLabel>
                            <Input onChange={handleDeleteInput} ref={initialRefDeleteModal} placeholder={fetchedSite.name} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        {
                            deleteInput === fetchedSite.name ? <Button onClick={handleDelete} colorScheme='red' mr={3}>
                                Delete
                            </Button> : <Button bg="#373342" disabled _hover={{
                                bg: "#373342"
                            }} cursor="not-allowed" colorScheme='red' mr={3}>
                                Delete
                            </Button>
                        }
                        <Button onClick={DeleteModalOnClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Box pt={24}>
                <Box display="flex" mr={20} flexDirection="column">
                    <Box mx={10} my={5} w="100%">
                        <Heading>{fetchedSite.name ? fetchedSite.name : "Loading..."}</Heading>
                        <Heading fontWeight="normal" size="md" color="gray.300">{fetchedSite.url ? fetchedSite.url : "Loading..."}</Heading>
                        <Box gap={3} display="flex" flexDirection="row">
                            <Button onClick={DeleteModalOnOpen} mt={5} rounded="xl" bg="#2a2733" _hover={{ bg: "#373342" }} leftIcon={<DeleteIcon />} >Delete</Button>
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
