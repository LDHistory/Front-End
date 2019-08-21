import React from 'react';

const BoardItem = ({no, title, name, date}) => {
    return (
        <tr>
            <td>{no}</td>
            <td>{title}</td>
            <td>{name}</td>
            <td>{date}</td>
        </tr>
    );
};

export default BoardItem;