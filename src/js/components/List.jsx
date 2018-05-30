import React, { PureComponent } from 'react';

class List extends PureComponent {
    render() {
        return (
            <div className="list">
                <h2 className="list__header">
                    {this.props.name}
                    <span className="list__header_item_count">
                        {this.props.children.length}
                    </span>
                </h2>
                <ul className="list__list">{this.props.children}</ul>
            </div>
        );
    }
}

export default List;
