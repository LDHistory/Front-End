import React from 'react';

const BoardUD = (props, state) => {

    let arr = [];

    let test = () => {
        arr = props.writeud[0];

        for (let key in arr) {
            // console.log(arr[key])
            return (
                <>
                    <tr>
                        <td align="center">
                            <div>제  목</div>
                        </td>
                        <td>
                            <input id="board_title" name="board_title" maxLength="30" size="50" value={props.writeud[0].board_title} onChange={props.handleupdateData} />
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <div>작성자</div>
                        </td>
                        <td>
                            <input id="board_name" name="board_name" maxLength="30" size="20" value={props.writeud[0].board_name} onChange={props.handleupdateData} />
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <div>비밀번호</div>
                        </td>
                        <td>
                            <input id="password" name="password" type="password" maxLength="4" size="10" onChange={props.handlePw} />
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <div>내  용</div>
                        </td>
                        <td>
                            <textarea id="board_contents" name="board_contents" cols="65" rows="15" value={props.writeud[0].board_contents} onChange={props.handleupdateData} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">&nbsp;</td>
                    </tr>
                    <tr>
                        <td colSpan="5" align="center">
                            <button onClick={async () => {
                                (props.props.state.password === props.writeud[0].board_password) ?
                                    props.ondataUpdate().then(() => {
                                        props.props.history.replace(`/board/${props.props.state.currentPage}`)
                                    })
                                    : alert('비밀번호를 다시 입력 하거라!')
                            }}>수정</button>
                            <button onClick={async () => {
                                (props.props.state.password === props.writeud[0].board_password) ?
                                    props.onDeleteContent().then(() => {
                                        props.props.history.replace(`/board/${props.props.state.currentPage}`)
                                    })
                                    : alert('비밀번호를 다시 입력 하거라!')
                            }}>삭제</button>
                            <button onClick={() => {
                                props.props.history.push(`/board/${props.props.state.currentPage}`)
                            }} >뒤로</button>
                        </td>
                    </tr>
                </>
            )
        }
    }

    return (
        <div align="center">
            <br />
            <h2>작성하거라</h2>
            {/* <form id="writeform"> */}
            <table cellPadding="5" cellSpacing="5" border="1" width="600" >
                <tbody>
                    {test()}
                </tbody>
            </table>
            {/* </form> */}
        </div>
    );
};
export default BoardUD;