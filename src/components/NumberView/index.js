import React from "react";

const NumberView = ({value = "0.000000"}) => {
    const split = value.split(".");
    return (
        <span className="digits">
            <span className="start">{split[0]}.</span>
            <span className="end">{split[1]} </span>
        </span>
    );
};
export default NumberView;