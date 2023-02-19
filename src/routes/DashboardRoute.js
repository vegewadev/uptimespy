import React from "react";
import Axios from "axios";
import Navbar from "../components/Navbar";
import {
    Box,
    Button,
    Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    useToast,
    Input

} from "@chakra-ui/react";

import {
    AddIcon
} from "@chakra-ui/icons";

import SiteCard from "../components/SiteCard";



function DashboardRoute() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)



    const [fetchedSites, setFetchedSites] = React.useState([]);

    const updateSite = () => {
        Axios.get("http://localhost:5000/api/sites", {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        }).then((res) => {
            setFetchedSites(res.data.sites);
        }).catch((err) => {
            window.location.href = "/";
        });
    }

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


    const [nameOfNewMonitor, setNameOfNewMonitor] = React.useState("");
    const [urlOfNewMonitor, setUrlOfNewMonitor] = React.useState("");

    const handleNameOfNewMonitorChange = (e) => {
        setNameOfNewMonitor(e.target.value);
    }

    const handleUrlOfNewMonitorChange = (e) => {
        setUrlOfNewMonitor(e.target.value);
    }

    const toast = useToast();
    const handleSubmit = async () => {
        await Axios.post("http://localhost:5000/api/site", {
            name: nameOfNewMonitor,
            url: urlOfNewMonitor,
        }, {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        }).then((res) => {
            onClose();
            updateSite();
            return true;
        }).catch((err) => {
            console.log(err);
            updateSite();
            return false;
        });

    };




    return (
        <Box>
            <Navbar />
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent
                    bg="#24212b">
                    <ModalHeader>Add new monitor</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name<span style={{ color: "#ff4230" }}>*</span></FormLabel>
                            <Input onChange={handleNameOfNewMonitorChange} ref={initialRef} placeholder='Name of the monitor' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>URL<span style={{ color: "#ff4230" }}>*</span></FormLabel>
                            <Input onChange={handleUrlOfNewMonitorChange} placeholder='URL of the site to monitor' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>

                        {nameOfNewMonitor.length > 0 && urlOfNewMonitor.length >= 10 && (urlOfNewMonitor.startsWith("http://") || urlOfNewMonitor.startsWith("https://")) ? <Button
                            onClick={() => {
                                handleSubmit() ? toast({
                                    title: "Monitor added.",
                                    description: "Your monitor has been added.",
                                    status: "success",
                                    duration: 9000,
                                    isClosable: true,
                                }) : toast({
                                    title: "Failed to add monitor.",
                                    description: "Could not add monitor. Please try again later.",
                                    status: "success",
                                    duration: 9000,
                                    isClosable: true,
                                })
                            }}
                            colorScheme="green"
                            mr={3}>Save</Button> :
                            <Button bg="#373342" color="gray.900" disabled _hover={{
                                bg: "#373342"
                            }} cursor="not-allowed" mr={3}>
                                Save
                            </Button>
                        }
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Box pt={24}>

                <Box display="flex" mr={20} flexDirection="column">
                    <Box mx={10} my={5} w="100%">
                        <Heading>Monitors</Heading>
                        <Button onClick={onOpen} rounded="xl" bg="#2a2733" _hover={{ bg: "#373342" }} my={3} mb={0} leftIcon={<AddIcon />} >
                            Add new Monitor
                        </Button>
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
