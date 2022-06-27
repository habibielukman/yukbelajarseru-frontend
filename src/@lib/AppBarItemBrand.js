import React from "react"

export default class AppBarItemBrand extends React.Component {
    render() {
        return (
            <li className="AppBarItemBrand" onClick={this.props.click}>
                {this.props.children}
            </li>
        )
    }
}