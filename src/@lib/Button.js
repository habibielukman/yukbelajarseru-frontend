import React from 'react'

export default class Button extends React.Component {
    render() {
        return <>
            <button className={'btn'} style={this.props.style} onClick={this.props.click} disabled={this.props.disabled}>{this.props.children}</button>  
        </>
    }
}