import React from "react";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react'

import LoginRoute from "../routes/LoginRoute";
import DashboardRoute from "../routes/DashboardRoute";

const RoutesHandler = () => {

  localStorage.setItem("chakra-ui-color-mode", "dark");

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "#1b1920",
        },
      },
    },
    config: {
      initialColorMode: "dark",
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript/>
      <Routes>
        <Route path="/" element={<LoginRoute />} />
        <Route path="/dashboard" element={<DashboardRoute />} />
      </Routes>
    </ChakraProvider>
  );
};

export default RoutesHandler;
