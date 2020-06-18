import React from "react";

import {
    Grid,
    Typography,
    TextField,
    withStyles,
    MenuItem,
    Box,
    Button
} from "@material-ui/core";

import inputStyles from "../Style/Style";
import currencies from "../constant/Currencies";

class Input extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            base: "BTC",
            quote: "USD",
            value: "1"
        };
        this.handleChange = this.handleChange.bind(this);
        this.swap = this.swap.bind(this);
    };

    componentDidMount()
    {
        this.props.onChange(this.state);
    };


    handleChange(event) {
        event.preventDefault();
        let {name, value} = event.target;

        if (name === "value" && value < 0)
            return;
        this.setState({[name]: value}, () => {
            if (this.props.onChange)
                this.props.onChange(this.state);
        });
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
                {currencies.sort().map((it) => (
                    <MenuItem className={classes.items} key={it} value={it}>
                        {it}
                    </MenuItem>
                ))}
            </TextField>
        )
    };

    swap(event)
    {
        event.preventDefault();
        let {quote, base} = this.state;

        this.setState({
            base: quote,
            quote: base
        }, () => {
            if (this.props.onChange)
                this.props.onChange(this.state);
        });
    };

    render()
    {
        const {classes} = this.props;
        const {quote, base, value} = this.state;

        return (
            <div className="App">
                <Grid container direction="row" alignItems="center" justify="center" alignContent="center">
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
                    <Grid item>
                        <Box pl={3}>
                            <Button variant="contained" color="primary" onClick={this.swap}>
                                Swap
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        )
    }
};

export default withStyles(inputStyles)(Input);