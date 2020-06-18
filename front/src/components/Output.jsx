import React from "react";
import {
    Typography
} from "@material-ui/core";

class Output extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            result: 0
        };
        console.log(this.props.input);
    };

    state = {
        result: 0
    };

    render()
    {
        return (
            <div className="App">
                <Typography variant="h3">
                    {this.state.result}
                </Typography>
            </div>
        )
    };
};

export default Output;