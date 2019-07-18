import React from 'react';

const List = ({children, name, handleHideList}) =>
    children.length > 0 && (
        <div className="list">
            <div className="list__header">
                <h2 className="list__header_list_name">
                    {name}
                    <span className="list__header_item_count">
                        {children.length}
                    </span>
                </h2>
                <button
                    onClick={() => handleHideList(name)}
                    className="button list__header_hide_list"
                >
                    &times;
                </button>
            </div>
            <ul className="list__list">{children}</ul>
        </div>
    );
export default List;
