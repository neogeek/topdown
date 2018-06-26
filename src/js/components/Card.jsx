import React, { PureComponent } from 'react';

const stringToHSL = string =>
    `hsl(${string
        .split()
        .reduce((accu, val) => (accu += val.charCodeAt() << 1000), 0) %
        250}, 80%, 60%)`;

class Card extends PureComponent {
    render() {
        return (
            <li className="list__list_item" title={this.props.boardName}>
                <a
                    href={this.props.url}
                    className="list__list_item_link card__link"
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
