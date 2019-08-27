import React from 'react';
import '../table.css'
import { Link } from 'react-router-dom';


const BoardItem = ({no, title, name, date, props, changeNumber}) => {
    
    return (
        <tr>
            <td data-th="No." >{no}</td>
            <td data-th="Title" >
                                {<Link 
                                // board/page/
                                to={`/board/${props.currentPage}/${no}`}
                                style={{ textDecoration: 'none', color: "black"}}
                                onClick={async ()=>{
                                    await changeNumber(no);
                                    await props.props.history.push(`/board/${props.currentPage}/${no}`);
                                }}>
                                {title}
                                </Link>
                            }
                                </td>
            <td data-th="Name" >{name}</td>
            <td data-th="Date" >{date}</td>
        </tr>
    );
};
export default BoardItem;