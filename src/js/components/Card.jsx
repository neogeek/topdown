import React, { Component } from 'react';

class Card extends Component {
    render() {
        return (
            <li className="card">
                <a href={this.props.url} className="card__link" target="_blank">
                    {this.props.name}
                </a>
            </li>
        );
    }
}

export default Card;
