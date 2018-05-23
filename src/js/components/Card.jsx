import React, { Component } from 'react';

class Card extends Component {

    render() {

        return (
            <li className="card">{this.props.name}</li>
        );

    }

}

export default Card;
