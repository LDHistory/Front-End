import React from 'react';

const BoardWrite = (props) => {
    console.log(props);
    
    return (
        <div align="center">
            <br />
            <h2>작성하거라</h2>
            {/* <form id="writeform"> */}
            <table cellPadding="5" cellSpacing="5" border="1" width="600">
                    <tr>
                        <td align="center">
                            <div>제  목</div>
                        </td>
                        <td>
                            <input name="title" maxLength="30" size="50" onChange={ props.handleSetBoardWriteData } />
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <div>작성자</div>
                        </td>
                        <td>
                            <input name="name" maxLength="30" size="20" onChange={props.handleSetBoardWriteData} />
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <div>비밀번호</div>
                        </td>
                        <td>
                            <input name="password" type="password" maxLength="4" size="10" onChange={ props.handleSetBoardWriteData }/>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <div>내  용</div>
                        </td>
                        <td>
                            <textarea name="content" cols="65" rows="15" onChange={props.handleSetBoardWriteData} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">&nbsp;</td>
                    </tr>
                    <tr>
                        <td colSpan="5" align="center">
                            <button onClick={()=>{
                                props.ondataSubmit()
                                } } >등록</button>
                            <button onClick={() => {props.changeBoard()}} >뒤로</button>
                        </td>
                    </tr>
            </table>
            {/* </form> */}
        </div>
    );
};
export default BoardWrite;