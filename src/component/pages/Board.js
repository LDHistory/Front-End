import React from 'react';
//import { Route, Link } from 'react-router-dom';
//import { BoardWrite } from './boardPages';
import { BoardItem } from './boardPages';

// 수정시작 ----------------------------------------------------------------------
//게시판 폼 css 임포트 코드
import './table.css'
// 수정끝 ----------------------------------------------------------------------

const Board = (props) => {

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
    // 수정시작 ----------------------------------------------------------------------
    // 테이블 전반적인 구조를 위해 수정
    return (
        <div align="center">
            <br />
            <h1 align="center">3조 게시판 렛츠기릿</h1>

            <table /*width="750" border="1"*/ class="rwd-table">
                <thead>
                    <tr>
                        <th width="60">No.</th>
                        <th width="350">Title</th>
                        <th width="150">Name</th>
                        <th width="190">Date</th>
                    </tr>
                </thead>
                
                <tbody>
                    {List}
                </tbody>
            </table>
            <br/>
            <button onClick={()=>{props.changeWrite()}}>글쓰기</button>
            <br />
        </div>
    );
};
    // 수정끝 ----------------------------------------------------------------------
export default Board;