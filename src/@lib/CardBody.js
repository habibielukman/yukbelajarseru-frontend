import React from "react";

export default class CardBody extends React.Component {
    render() {
        return <div className="card-body mb-2" {...this.props}>
            {this.props.children}
        </div>
    }
}