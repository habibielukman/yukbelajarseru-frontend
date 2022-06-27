import React from "react";

export default class Table extends React.Component {
    render() {
        return (
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            {this.props.children[0]}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.children[1]}
                    </tbody>
                </table>
            </div>
}