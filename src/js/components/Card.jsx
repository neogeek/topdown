import React, { Component } from 'react';

const stringToHSL = string =>
    `hsl(${string
        .split()
        .reduce((accu, val) => (accu += val.charCodeAt() << 1000), 0) %
        250}, 80%, 60%)`;

class Card extends Component {
    render() {
        return (
            <li className="card" title={this.props.boardName}>
                <a
                    href={this.props.url}
                    className="card__link"
                    target="_blank"
                    style={{
                        borderLeftColor: stringToHSL(this.props.boardName)
                    }}
                >
                    {this.props.name}
                </a>
            </li>
        );
    }
}

export default Card;
