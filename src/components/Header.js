import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useSelector, useDispatch } from "react-redux";
import { setThemeMode } from "../actions/themeModeAction";

export default function Header() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setThemeMode(event.target.checked === true ? "dark" : "light"));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task & Theme Management
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={state.themeMode === "dark" ? true : false}
                  onChange={handleChange}
                  aria-label="Switch Theme Mode"
                />
              }
              label={
                state.themeMode[0].toUpperCase() + state.themeMode.slice(1)
              }
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
