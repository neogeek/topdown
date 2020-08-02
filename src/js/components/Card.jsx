import React from 'react';

const stringToHSL = string =>
    `hsl(${string
        .split()
        .reduce((accu, val) => (accu += val.charCodeAt() << 1000), 0) %
        250}, 80%, 60%)`;

const Card = ({ boardName, url, name }) => (
    <li className="list__list_item" title={boardName}>
        <a
            href={url}
            className="list__list_item_link card__link"
            target="_blank"
            style={{
                borderLeftColor: stringToHSL(boardName)
            }}
        >
            {name}
        </a>
    </li>
);
export default Card;
