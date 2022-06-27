import React from 'react'

export default class Text extends React.Component {
    render() {
        if(!this.props.type) {
            return <span {...this.props}>{this.props.children}</span>
        }else{
            if(this.props.type === "h1") {
                return <h1 style={this.props.style} {...this.props}>{this.props.children}</h1>
            }else if(this.props.type === "h2") {
                return <h2 style={this.props.style} {...this.props}>{this.props.children}</h2>
            }else if(this.props.type === "h3") {
                return <h3 style={this.props.style} {...this.props}>{this.props.children}</h3>
            }else if(this.props.type === "h4") {
                return <h4 style={this.props.style} {...this.props}>{this.props.children}</h4>
            }else if(this.props.type === "h5") {
                return <h5 style={this.props.style} {...this.props}>{this.props.children}</h5>
            }else if(this.props.type === "h6") {
                return <h6 style={this.props.style} {...this.props}>{this.props.children}</h6>
            }
        }
    }
}