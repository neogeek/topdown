import React, { PureComponent } from 'react';

class List extends PureComponent {
    render() {
        return (
            this.props.children.length > 0 && (
                <div className="list">
                    <div className="list__header">
                        <h2 className="list__header_list_name">
                            {this.props.name}
                            <span className="list__header_item_count">
                                {this.props.children.length}
                            </span>
                        </h2>
                        <button
                            onClick={() =>
                                this.props.handleHideList(this.props.name)
                            }
                            className="button list__header_hide_list"
                        >
                            &times;
                        </button>
                    </div>
                    <ul className="list__list">{this.props.children}</ul>
                </div>
            )
        );
    }
}

export default List;
