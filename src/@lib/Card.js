import React from 'react'

export default class Card extends React.Component {
    render() {
        return (
            <div className='card m-3' id={this.props.id} {...this.props}>
                {this.props.children}
            </div>
        )
    }
}