import React from 'react';
import '../table.css'

const BoardItem = ({no, title, name, date}) => {
    return (
        <tr>
            <td data-th="No." >{no}</td>
            <td data-th="Title" >{title}</td>
            <td data-th="Name" >{name}</td>
            <td data-th="Date" >{date}</td>
        </tr>
    );
};
export default BoardItem;