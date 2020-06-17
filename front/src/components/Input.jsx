import React from "react";

import {
    Grid,
    Typography,
    TextField,
    withStyles,
    MenuItem,
    Box
} from "@material-ui/core";

import inputStyles from "./Style";

const currencies = [
    "CAD",
    "HKD",
    "ISK",
    "PHP",
    "DKK",
    "HUF",
    "CZK",
    "AUD",
    "RON",
    "SEK",
    "IDR",
    "INR",
    "BRL",
    "RUB",
    "HRK",
    "JPY",
    "THB",
    "CHF",
    "SGD",
    "PLN",
    "BGN",
    "TRY",
    "CNY",
    "NOK",
    "NZD",
    "ZAR",
    "USD",
    "MXN",
    "ILS",
    "GBP",
    "KRW",
    "MYR",
    "EUR"
]

class Input extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };

    state = {
        base: "USD",
        quote: "EUR",
        value: 1
    };

    handleChange(event) {
        event.preventDefault();
        let {name, value} = event.target;

        if (name === "value") {
            if (value >= 0)
                this.setState({value});
        } else
            this.setState({[name]: value});
    };

    createMenu(value, label) {
        const {classes} = this.props;

        return (
            <TextField
                id={label}
                select
                label={label}
                name={label}
                value={value}
                onChange={this.handleChange}
                InputProps={{
                    className: classes.input
                }}
                InputLabelProps={{
                    className: classes.label
                }}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu
                    }
                }}
            >
                {currencies.map((it) => (
                    <MenuItem className={classes.items} key={it} value={it}>
                        {it}
                    </MenuItem>
                ))}
            </TextField>
        )
    };

    render()
    {
        const {classes} = this.props;
        console.log(this.state);
        const {quote, base, value} = this.state;

        return (
            <div className="App">
                <Grid container direction="row" alignItems="center">
                    <Grid item>
                        <Typography variant="h6">
                            Convert
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField className={classes.field}
                            id="value"
                            label="value"
                            type="number"
                            variant="outlined"
                            name="value"
                            onChange={this.handleChange}
                            value={value}
                            InputProps={{
                                className: classes.input
                            }}
                            InputLabelProps={{
                                className: classes.label
                            }}
                        />
                    </Grid>
                    <Grid item>
                        {this.createMenu(base, "base")}
                    </Grid>
                    <Grid item>
                        <Box pl={3} pr={3}>
                            <Typography variant="h6">
                                To
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        {this.createMenu(quote, "quote")}
                    </Grid>
                </Grid>
            </div>
        )
    }
};

export default withStyles(inputStyles)(Input);