import React from "react";
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineSeries
} from 'react-vis';
import {
    Button,
    Grid
} from "@material-ui/core";

class HistoryGraph extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            values: {},
            data: []
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
                this.setState({values: json.value})
            else
                console.error(json);
        })
        .catch(err => console.error(err));
    };

    update(event)
    {
        event.preventDefault();
        let {quote} = this.props;
        let data = Object.keys(this.state.values).map(it => {
            return {
                x: it,
                y: this.state.values[it][quote]
            };
        });
        this.setState({data});
    };

    render()
    {
        return (
            <div>
                <Grid container direction="column" alignItems="center" justify="center">
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
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    };
};

export default HistoryGraph;