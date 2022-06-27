import React from "react"

export default class AppBar extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    {this.props.children}
                </div>
            </nav>
        )
    }
}