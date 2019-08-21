import React from 'react';

const BoardWrite = () => {
    return (
        <div>
            <br />
            <h2>작성하거라</h2>
            <table cellPadding="5" cellSpacing="5" border="1" width="600">
                <tbody>
                    <tr>
                        <td align="center">
                            <div>제  목</div>
                        </td>
                        <td>
                            <input name="title" value={this.state.title} maxLength="30" size="50" onChange={this.handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <div>작성자</div>
                        </td>
                        <td>
                            <input name="name" value={this.state.name} maxLength="30" size="20" onChange={this.handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <div>비밀번호</div>
                        </td>
                        <td>
                            <input name="password" value={this.state.password} type="password" maxLength="4" size="10" onChange={this.handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <div>내  용</div>
                        </td>
                        <td>
                            <textarea name="content" value={this.state.content} cols="65" rows="15" onChange={this.handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">&nbsp;</td>
                    </tr>
                    <tr>
                        <td colSpan="5" align="center">
                            <button onClick={this.onDataSubmit}>등록</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BoardWrite;