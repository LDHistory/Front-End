import React from 'react';

const BoardWrite = (props) => {
    console.log(props);
    
    return (
        <div align="center">
            <br />
            <h2>작성하거라</h2>
            <table cellPadding="5" cellSpacing="5" border="1" width="600">
                <tbody>
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
                            <button onClick={ async ()=>{
                                await props.ondataSubmit()
                                
                                
                                // 등록 버튼 클릭 시 뒤로 가도록
                                await props.props.history.push('/board')
                                } } >등록</button>
                                {/* 뒤로 버큰 틀릭 시 뒤로 가도록 */}
                            <button onClick={() => {props.props.history.push('/board')}} >뒤로</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* </form> */}
        </div>
    );
};
export default BoardWrite;