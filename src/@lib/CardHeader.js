import React from "react";

export default class CardHeader extends React.Component {
    render() {
        return <div className="card-header" {...this.props}>
            {this.props.children}
        </div>
    }
}