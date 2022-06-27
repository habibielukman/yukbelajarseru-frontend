import React from "react";

export default class Tooltip extends React.Component {
    render() {
        return (
            <div className="tooltip">
                {this.props.children}
            </div>
        )
    }
}