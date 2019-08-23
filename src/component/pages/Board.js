import React from 'react';
//import { Route, Link } from 'react-router-dom';
//import { BoardWrite } from './boardPages';
import { BoardItem } from './boardPages';
import { Link } from 'react-router-dom';

import './table.css'
import './button.css'

const Board = (props) => {
    // console.log('rownum test : ', props.list[8].rownum);
    // console.log('total count : ', props.totalCount);

    ////총 게시글 개수를 비구조화 할당하며 선언
    const { totalCount } = props;


    //한 페이지에 출력될 게시물 수, 페이지당 10개의 게시물
    //let countList = 10;


    //한 화면에 출력될 페이지 수, 한 화면에 10개의 페이지를 출력
    let countPage = 10;


    //현재 페이지 번호
    let currentPage = props.currentPage;
    //console.log('현재 currentPage 값은? : ', currentPage);


    
    //totalPage 총 페이지의 수를 정하는 변수. 연산을 통해 변해야 하므로 let으로 선언.
    //한 페이지당 10개의 게시글이 있으므로 10으로 나눈 값에 나머지가 있을 경우 올림을 해서 총 페이지수를 정한다.
    let totalPage = totalCount / 10;
    if(totalCount % 10 > 0) {
        totalPage = Math.ceil(totalPage);
        //console.log('올림을 했다면 총 페이지의 수는? ', totalPage);
    }


    //현재 페이지번호가 총 페이지번호보다 크다면 현재 페이지번호를 강제로 총 페이지번호로 치환
    if(currentPage > totalPage) {
        currentPage = totalPage;
    }

    //countPage를 어떻게 출력할 지 startPage와 endPage를 지정.
    //ex1) currentPage가 5일 때, startPage=1  / endPage=10
    //ex2) currentPage가 13일 때, startPage=11  / endPage=20

    //시작 페이지 구하는 식
    let startPage = Math.floor(((currentPage - 1) / 10)) * 10 + 1;
    //console.log('startPage : ', startPage);

    //끝 페이지 구하는 식
    let endPage = startPage + countPage - 1;
    //console.log('endPage : ', endPage);

    //마지막 페이지가 ~0 단위로 안떨어지는 경우에는 마지막 페이지를 총 페이지수로 대체해야 함
    if(endPage > totalPage) {
        endPage = totalPage;
    }



    

    const pageNumber = [];
    for(let i=1; i<totalPage+1; i++) {
        pageNumber.push(i);
    }

    const pageNumberList = () => {
        const arrTmp = [];
        for(let i=startPage; i<=endPage; i++) {
            if(i === currentPage) {
                arrTmp.push(
                    <button className="button2" key={i}>
                    <Link
                        to={`/board`}
                        style={{ textDecoration: 'none' }}
                        key={i}
                        onClick={ async () => {
                            //자바스크립트는 함수가 비동기로 실행되므로... 동기로 바꿔줘야함.
                            //getBoardList()가 먼저 호출되어서 setCurrentPage의 setState가 뒤늦게 됨.. 그래서 두번클릭해야 나옴..
                            await props.setCurrentPage(i);
                            await props.getBoardList(currentPage);
                        }}
                    >
                        <b> {i} </b>
                    </Link>
                    </button>
                );
            }
            else {
                arrTmp.push(
                    <button className="button2" key={i} >
                    <Link
                        // /${i}
                        to={`/board`}
                        style={{ textDecoration: 'none' }}
                        key={i}
                        onClick={ async () => {                            
                            await props.setCurrentPage(i);
                            await props.getBoardList(currentPage);
                        }}
                    >
                         [{i}] 
                    </Link>
                    </button>
                );
            }
        }
        return arrTmp;
    }

    

    
    const List = props.list.map((value, key) => 
    {
        return (
            <BoardItem
                no={value.rownum}
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

            <table className="rwd-table" border="1">
                <thead>
                    <tr>
                        <th width="90">글 번호</th>
                        <th width="340">제   목</th>
                        <th width="130">이   름</th>
                        <th width="190">작성 일자</th>
                    </tr>
                </thead>
                
                <tbody>
                    {List}
                </tbody>
            </table>
            <br/>
            <button className="button" onClick={()=>{props.props.history.push('/board/write')}}>글쓰기</button>
            <br />

            <center>
                {pageNumberList()}
            </center>
        </div>
    );
};
    // 수정끝 ----------------------------------------------------------------------
export default Board;