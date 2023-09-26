import React, { useEffect } from "react";
import Header from "../components/Header";
import Home from "../components/Home";
import Footer from "../components/Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";

export default function Base() {
  const state = useSelector((state) => state);
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: state.themeMode,
        },
      })}
    >
      <Header></Header>
      <Home></Home>
      <CssBaseline />

      <Footer></Footer>
    </ThemeProvider>
  );
}
