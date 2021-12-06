import React from "react";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Carlist from "./components/carlist";

function App() {
  return (
    <div className="App">
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6">CARSHOP</Typography>
        </Toolbar>
      </AppBar>
      <Carlist />
    </div>
  );
}

export default App;
