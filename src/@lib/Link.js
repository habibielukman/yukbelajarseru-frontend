import React from "react";
import root from "../index";

export default class Link extends React.Component {
    navigate = () => {
        root.render(this.props.to)
    }

    render() {
        return (
            <a onClick={this.navigate} {...this.props}>{this.props.children}</a>
        )
    }
}