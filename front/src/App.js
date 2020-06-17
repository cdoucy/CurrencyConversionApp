import React from 'react';
import {
    Grid,
    Typography
} from "@material-ui/core"
import './App.css';
import Input from "./components/Input";

function App({classes, ...rest})
{
  return (
    <div className="App">
        <div className="container">
            <Grid className="mainGrid" container direction="column" justify="space-evenly" alignItems="center" alignContent="center">
                <Grid item>
                    <Typography variant="h2">Currency Converter</Typography>
                </Grid>
                <Grid item>
                    <Input/>
                </Grid>
            </Grid>
        </div>
    </div>
  );
}

export default App;
