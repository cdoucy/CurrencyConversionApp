import React from "react";
import {
    XYPlot,
    XAxis,
    YAxis,
    LineSeries
} from 'react-vis';
import {
    Button,
    Grid,
    Typography
} from "@material-ui/core";

const description = " historical rates since 1 year based on ";

class HistoryGraph extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: [],
            title: `EUR${description}USD`
        };
        this.update = this.update.bind(this);
    };

    componentDidMount()
    {
        this.fetchHistory();
    };

    fetchHistory()
    {
        let data = {
            base_currency: this.props.base,
            quote_currency: this.props.quote
        };

        fetch('/api/history', {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
            if (json.result === "success")
                this.processData(json.value);
            else
                console.error(json);
        })
        .catch(err => console.error(err));
    };

    processData(rawData)
    {
        let {quote} = this.props;
        let data = Object.keys(rawData).map(it => {
            return {
                x: it,
                y: rawData[it][quote]
            };
        });

        this.setState({data});
    };

    update(event)
    {
        event.preventDefault();
        let {quote, base} = this.props;
        if (quote !== "BTC" && base !== "BTC") {
            this.fetchHistory();
            this.setState({
                title: `${quote}${description}${base}`
            });
        } else
            this.setState({
                title: "BTC is not supported by graph"
            });
    };

    render()
    {
        return (
            <div className="App">
                <Grid container direction="column" alignItems="center" justify="center" style={{display: "flex"}}>
                    <Grid item>
                        <Typography variant="subtitle1">
                            {this.state.title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <XYPlot color="white"
                            xType="ordinal"
                            width={750}
                            height={400}
                            margin={{left: 100}}>
                            <XAxis hideTicks title="Time"/>
                            <YAxis title="Values"/>
                            <LineSeries
                                data={this.state.data}
                                style={{stroke: 'white', strokeWidth: 1, color: 'white'}}
                            />
                        </XYPlot>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={this.update}>
                            Update graph
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    };
};

export default HistoryGraph;