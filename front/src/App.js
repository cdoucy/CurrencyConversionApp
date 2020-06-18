import React from 'react';
import {
    Grid,
    Typography,
    Link,
} from "@material-ui/core"
import './App.css';
import Input from "./components/Input";
import HistoryGraph from "./components/HistoryGraph";

class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            result: 0,
            base: "USD",
            quote: "EUR"
        };
        this.inputCallback = this.inputCallback.bind(this);
    };

    round(value)
    {
        return Math.round((value + Number.EPSILON) * 100) / 100;
    };

    convert(data)
    {
        fetch('/api/convert', {
            method: "POST",
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            return res.json();
        })
        .then(json => {
            if (json.result === "success")
                this.setState({
                    result: data.quote_currency !== "BTC" ? this.round(json.value) : json.value
                });
            else {
                console.error(json);
                this.setState({result: "Request to exchangeratesapi.io failed."});
            }
        })
        .catch(err => console.error(err));
    };

    inputCallback(inputState) {
        let {value, base, quote} = inputState;
        if (value === "")
            return;
        this.setState({base, quote});
        if (quote === base) {
            this.setState({result: `I think you can convert ${base} into ${base} by yourself.`});
            return;
        }
        this.convert({
            base_currency: base,
            value: value,
            quote_currency: quote
        });
    };

    render()
    {
        let {result, quote, base} = this.state;

        return (
            <div className="App">
                <div className="container">
                    <Grid className="mainGrid" container direction="row" justify="space-evenly" alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant="h2">Currency Converter</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Input onChange={this.inputCallback}/>
                        </Grid>
                        <Grid item xs={12}>
                        <Typography variant="h3">
                            {result} {quote !== base && quote}
                        </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <HistoryGraph base={base} quote={quote}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                Powered by
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                <Link href="https://exchangeratesapi.io/">
                                    exchanges rates api
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                <Link href="https://www.blockchain.com/api/exchange_rates_api">
                                    blockchain.com api
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    };
}

export default App;