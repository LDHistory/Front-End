import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import { Signin, Signup, Main } from './component/pages';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleGetBoardList();
    this.handleTotalPage();
  }

  state = {

    number: '',

    keyud: '',

    signin: {
      email: '',
      pw: '',
    },

    signup: {
      first: '',
      last: '',
      email: '',
      pw: '',
    },

    //게시글 전체 목록을 담을 배열
    arr: [

    ],

    //게시글 개수를 담는 변수
    totalCount: 0,


    // 글쓰기에서 사용할 state 변수 선언  
    write: {
      title: '',
      name: '',
      password: '',
      content: '',
      date: '',
    },


    //현재 페이지를 반환하는 변수
    currentPage: 1,

    writeud: [

    ],
  }

  //로그인 폼에서 입력한 값을 state에 업데이트 하는 메서드
  handleSetSigninData = (e) => {
    this.setState({
      ...this.state,
      signin: {
        ...this.state.signin,
        [e.target.name]: e.target.value,
      }
    })
    console.log(this.state.signin);
  }

  //로그인 버튼을 눌렀을 때 express 서버로 보낸 data를 db에서 검증
  handleSignin = () => {
    return new Promise((resolve, reject) => {
      axios.post('http://13.58.55.98:5000/request/login', {
        email: this.state.signin.email,
        pw: this.state.signin.pw,
      })
        .then(response => {
          resolve(response.data);
        })
        .catch(response => {
          reject(response.data);
        })
    })
  }

  //로그아웃 기능을 하는 메서드
  handleLogout = () => {
    this.setState({
      ...this.state,
      signin: {
        email: '',
        pw: '',
      }
    })
  }

  //회원 가입 폼에서 입력한 값을 state에 업데이트 하는 메서드
  handleSetSignupData = (e) => {
    this.setState({
      ...this.state,
      signup: {
        ...this.state.signup,
        [e.target.name]: e.target.value,
      }
    })
  }


  // BoardWrite 페이지에서 입력한 값을 state에 업데이트 하는 메서드
  handleSetBoardWriteData = (e) => {
    this.setState({
      ...this.state,
      write: {
        ...this.state.write,
        [e.target.name]: e.target.value,
      }
    })
  }

  


  //회원 가입 버튼을 눌렀을 때 express서버로 data를 전송하는 메서드
  handleSignup = () => {
    return new Promise((resolve, reject) => { //axios 비동기 작업을 Promise then으로 동기적으로 바꿈
      axios.post('http://13.58.55.98:5000/request/join', {
        first: this.state.signup.first,
        last: this.state.signup.last,
        email: this.state.signup.email,
        pw: this.state.signup.pw,
      })
        .then((response) => {
          resolve(response.data);
        })
    })
  }

  //모든 게시글 List를 가져오는 메소드
  handleGetBoardList = () => {
    axios.get(`http://13.58.55.98:5000/request/getBoardList/${this.state.currentPage}`)
      .then((response) => {
        this.setState({
          ...this.state,
          arr: response.data,
        });
        console.log(this.state.arr);
      })
  }
  
  handleSetCurrentPage = (num) => {
    this.setState({
      ...this.state,
      currentPage: num,
    })
  }

  handlePw = (e) => {
    this.setState({
      ...this.state.write,
      [e.target.name]: e.target.value,
    })
  }

  onDeleteContent = () => {
    alert('삭제 완료')

    return new Promise((resolve, reject) => {
      axios.post('http://13.58.55.98:5000/request/setBoardDelete', {
      board_id: this.state.writeud[0].board_id,
      board_password: this.state.password
    }).then(async (res) => {
        await this.handleGetBoardList();
        await this.handleTotalPage();
        await resolve();
      })
    })
  }

  // 글쓰기 페이지에서 버튼 클릭시 DB에 데이터 전송
  ondataSubmit = () => {
    console.log(new Date().toLocaleDateString('ko-KR').concat(new Date().toLocaleTimeString()))

    axios.post('http://13.58.55.98:5000/request/setBoard', {
      name: this.state.write.name,
      user: "ehd8266",
      pw: this.state.write.password,
      contents: this.state.write.content,
      date: new Date().toLocaleDateString('ko-KR').concat(new Date().toLocaleTimeString()),
      title: this.state.write.title,
    })
      .then(async (res) => {
        if (res.data) {
          alert('글 등록 완료')
          await this.handleGetBoardList();
          await this.handleTotalPage();
        }
        else {
          alert('글 등록 실패 이유는 아몰랑!')
        }
      })
      .catch((res) => {
        console.log('전송실패');
        alert('글 등록 실패 이유는 아몰랑!')
      })


    this.setState({
      ...this.state,
      write: {
        title: '',
        name: '',
        password: '',
        content: '',
        date: '',
      }
    })

  }

  //////////////////////////////////////////////////////
  // 수정한 데이터 db로 전송
  ondataUpdate = () => {
    alert('수정 완료')

    console.log(this.state.writeud[0]);
    
    return new Promise((resolve, reject) => {
      axios.post('http://13.58.55.98:5000/request/getBoardModify', {
      board_id: this.state.writeud[0].board_id,
      board_password: this.state.writeud[0].board_password,
      name: this.state.writeud[0].board_name,
      user: "edh8266",
      contents: this.state.writeud[0].board_contents,
      date: new Date().toLocaleDateString('ko-KR').concat(new Date().toLocaleTimeString()),
      title: this.state.writeud[0].board_title,    
    }).then(async (res) => {
      console.log('res',res);
        await this.handleGetBoardList();
        await this.handleTotalPage();
        await resolve();
      })
    })
  }
  
  // 수정 handle
  handleupdateData = (e) => {
    this.setState({
      ...this.state,
      writeud: [{
        ...this.state.writeud[0],
        [e.target.name]: e.target.value,
      }]
    })
  }


  //총 게시글의 개수를 가져옴
  handleTotalPage = () => {
    axios.get('http://13.58.55.98:5000/request/getBoardCount')
      .then((response) => {
        this.setState({
          ...this.state,
          totalCount: response.data,
        })
      })
  }

  changeNumber = (number) => {
    for (let i = 0; i < 10; i++) {
      if (this.state.arr[i].rownum === number) {
        // console.log('출력', this.state.arr[i]);

        axios.get('http://13.58.55.98:5000/request/getBoardContents', {
          params: {
            board_id: this.state.arr[i].board_id
          }
        })
          .then((res) => {
            this.setState({
              ...this.state,
              writeud: res.data,
            })
          })
      }
    }
    console.log('writeud', this.state.writeud);
  }


  render() {
    return (
      <div>
        <Switch>
          <Route
            path='/login'
            render={props => <Signin {...props} setData={this.handleSetSigninData} signin={this.handleSignin} changeAbout={this.changeAbout} />}
          />

          <Route
            path='/join'
            render={props => <Signup {...props} setData={this.handleSetSignupData} signup={this.handleSignup} changeAbout={this.changeAbout} />}
          />
          <Route
            path="/"
            render={props =>
              <Main {...props}
                setData={this.handleSetSignupData}
                signup={this.handleSignup}
                changeAbout={this.changeAbout}
                changeBoard={this.changeBoard}

                changeWrite={this.changeWrite}
                handleSetBoardWriteData={this.handleSetBoardWriteData}
                ondataSubmit={this.ondataSubmit}

                handleLogout={this.handleLogout}

                writeud={this.state.writeud}
                state={this.state}
                setCurrentPage={this.handleSetCurrentPage}
                getBoardList={this.handleGetBoardList}
                changeNumber={this.changeNumber}
                ondataUpdate={this.ondataUpdate}

                handlePw={this.handlePw}
                onDeleteContent={this.onDeleteContent}

                handleupdateData={this.handleupdateData}
              />
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;