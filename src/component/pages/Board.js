import React from 'react';
import { Route, Link } from 'react-router-dom';
import { BoardItem, BoardWrite } from './boardPages';

const Board = (props) => {
    console.log(props);
    return (
        <div align="center">
            <Route exact path='/boardwrite' component={BoardWrite} />
            <br />
            <h2 align="center">3조 게시판 렛츠기릿</h2>

            <table border="1" width="700">
                <tbody>
                    <tr >
                        <td align="center">No.</td>
                        <td align="center">Title</td>
                        <td align="center">Name</td>
                        <td align="center">Content</td>
                        <td align="center">Date</td>
                    </tr>
                    {/* {
                            datas.map((row) =>
                                (<BoardItem key={row.no} row={row} onRemove={this.handleRemove} onUpdate={this.handleUpdate} />)
                            )
                        } */}
                </tbody>
            </table>
            <br />페이징처리 부분<br /><br />
            <Link to='/boardwrite'><button>글쓰기</button></Link>
            <br />
        </div>
    );
};

export default Board;