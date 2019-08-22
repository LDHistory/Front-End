import React from 'react';
// 수정시작 ----------------------------------------------------------------------
// .CSS 임포트
// 태그에 css 적용
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
// 수정끝 ----------------------------------------------------------------------
export default BoardItem;