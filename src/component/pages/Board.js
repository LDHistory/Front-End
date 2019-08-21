import React from 'react';
//import { Route, Link } from 'react-router-dom';
//import { BoardWrite } from './boardPages';
import { BoardItem } from './boardPages';

const Board = (props) => {
    console.log('과연? : ', props.list);

    const List = props.list.map((value, key) => 
    {
        return (
            <BoardItem
                no={value.board_id}
                title={value.board_title}
                name={value.board_name}
                date={value.board_date}
                key={key}
            />
        )
    });

    return (
        <div align="center">
            <br />
            <h2 align="center">3조 게시판 렛츠기릿</h2>

            <table width="1000" border="1">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Name</th>
                        <th>Date</th>
                    </tr>
                </thead>
                
                <tbody>
                    {List}
                </tbody>
            </table>
            <br />
        </div>
    );
};

export default Board;