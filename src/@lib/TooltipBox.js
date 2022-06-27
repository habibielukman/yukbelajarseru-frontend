import React from "react";

export default class TooltipBox extends React.Component {
    render() {
        return (
            <div className="tooltiptext">
                {this.props.children}
            </div>
        )
    }
}