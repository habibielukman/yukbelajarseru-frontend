import React from "react";

export default class AppBarHamburgerMenu extends React.Component {
    render() {
        return (
            <li className="AppBarItem Hamburger" style={{right: "0"}} {...this.props}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" width="1.5rem" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            </li>
        );
    }
}