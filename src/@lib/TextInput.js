import React from "react";
export default class TextInput extends React.Component {
    render() {
        return (
            <input className="form-control" {...this.props}/>
        );
    }
}