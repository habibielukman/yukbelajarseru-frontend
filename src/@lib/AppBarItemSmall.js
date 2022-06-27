import React from "react"

export default class AppBarItem extends React.Component {
    render() {
        return (
            <li className="AppBarItem ItemSmall" onClick={this.props.click}>
                {this.props.children}
            </li>
        )
    }
}