import React from "react";

export default class AppBarItems extends React.Component {
    render() {
        return (
            <div className="AppBarItems">
                {this.props.children}
            </div>
        )
    }
}