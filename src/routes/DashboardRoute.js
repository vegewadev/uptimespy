import React from "react";
import Axios from "axios";
import Navbar from "../components/Navbar";

import {
    Box,
    Heading
} from "@chakra-ui/react";


function DashboardRoute() {

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
            <Heading>Dashboard</Heading>

        </Box>
    );
}

export default DashboardRoute;
