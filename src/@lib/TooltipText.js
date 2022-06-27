import React from "react";

export default class TooltipText extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}