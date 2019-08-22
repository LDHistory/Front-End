import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import { Signin, Signup, Main } from './component/pages';

class App extends Component {

  state = {
    site: 'about',

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

    arr: [
      
    ],
  // 수정시작 ----------------------------------------------------------------------
  // 글쓰기에서 사용할 state 변수 선언  
    write: {
      title: '',
      name: '',
      password: '',
      content: '',
      date:'',
    }
  // 수정끝 ----------------------------------------------------------------------
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
      signin : {
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
    console.log(this.state.signup);
  }

  // 수정시작 ----------------------------------------------------------------------
  // BoardWrite 페이지에서 입력한 값을 state에 업데이트 하는 메서드
  handleSetBoardWriteData = (e) => {
    this.setState({
      ...this.state,
      write: {
        ...this.state.write,
        [e.target.name]: e.target.value,
      }
    })
    console.log(this.state.write);
  }
  // 수정끝 ----------------------------------------------------------------------

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

  //게시판 정보를 DB에서 가져오는 메서드
  handleGetBoard = () => {
    axios.get('http://13.58.55.98:5000/request/getBoardList')
    .then((response) => {
      this.setState({
        arr: response.data,
      });
    })
  }

  //Main 페이지에 띄울 sub 페이지를 정하기 위해 site 상태값을 조정
  changeAbout = () => {
    this.setState({
        site : 'about',
    })
  }


  // 수정시작 ----------------------------------------------------------------------
  //Main 페이지에 띄울 sub 페이지를 정하기 위해 site 상태값을 조정
  // this.handleGetBoard(); 여기로 이동시킴,
  // board로 이동할 때 마다 db데이터 값을 가져오기 위함
  changeBoard = () => {
     this.setState({
         site : 'board',
     })
  }
  // 수정끝 ----------------------------------------------------------------------



  // 수정시작 ----------------------------------------------------------------------
  // Borad 페이지에서 글쓰기 페이지를 정하기 위해 site 상태값을 조정
  changeWrite = () => {
    this.setState({
      site : 'boardwrite',
    })
  }
  // 수정 끝----------------------------------------------------------------------


  // 수정시작 ----------------------------------------------------------------------
  // 글쓰기 페이지에서 버튼 클릭시 DB에 데이터 전송
  ondataSubmit = () => {
    console.log(this.state.write.title);
    console.log(this.state.write.name);
    console.log(this.state.write.password);
    console.log(this.state.write.content);
    console.log(new Date().toLocaleDateString('ko-KR').concat(new Date().toLocaleTimeString()))
    
    console.log(this.state.write);
    

    axios.post('http://13.58.55.98:5000/request/setBoard', {
      name: this.state.write.name,
      user: "ehd8266",
      pw: this.state.write.password,
      contents: this.state.write.content,
      date: new Date().toLocaleDateString('ko-KR').concat(new Date().toLocaleTimeString()),
      title: this.state.write.title,
    })
      .then((res) => {
        console.log(res);
        if (res.data) {
          alert('글 등록 완료')
          this.changeBoard();
        }
        else {
          alert('글 등록 실패 이유는 아몰랑!')
        }
      })
      .catch((res) => {
        console.log(res.data);
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
  // 수정끝 ----------------------------------------------------------------------


  // 수정시작 ----------------------------------------------------------------------
  // this.handleGetBoard(); 를 changeBoard 안으로 이동
  componentDidMount() {
    this.handleGetBoard();
    this.handleTotalPage();
  }


  //--------------------------------------------
  //페이징 처리 로직 작성 중...

  
  //한 페이지에 출력될 게시물 수 : countList  => 페이지당 10개의 게시물
  //한 화면에 출력될 페이지 수 : countPage => 한 화면에 10개의 페이지를 출력
  //현재 페이지 번호 : currentPage


  //총 게시글의 개수를 가져와서
  //한 페이지에 출력될 게시물 수(10, countList)로 나눈 값을 반환한다.
  handleTotalPage = () => {
    axios.get('http://13.58.55.98:5000/request/getBoardCount')
    .then((response) => {
      console.log('게시글 개수.. string 타입이므로 parsing하기 : ', response.data);
    })
  }
  // 수정끝 ----------------------------------------------------------------------




  //--------------------------------------------

  render() {

    return (
      <div>
        <Route
          exact path='/'
          render={ props =>
                      <Main {...props}
                        setData={this.handleSetSignupData}
                        signup={this.handleSignup}
                        changeAbout={this.changeAbout}
                        changeBoard={this.changeBoard}
      
                        // 수정시작 ----------------------------------------------------------------------
                        changeWrite={this.changeWrite}
                        handleSetBoardWriteData={this.handleSetBoardWriteData}
                        ondataSubmit={this.ondataSubmit}
                        // 수정끝 ----------------------------------------------------------------------
      
                        handleLogout={this.handleLogout} 
      
                        site={this.state.site}
                        state={this.state}
                      />
                  }
        />
        
        <Route
          path='/login'
          render={props => <Signin {...props} setData={this.handleSetSigninData} signin={this.handleSignin} changeAbout={this.changeAbout} />}
        />

        <Route
          path='/join'
          render={props => <Signup {...props} setData={this.handleSetSignupData} signup={this.handleSignup} changeAbout={this.changeAbout} />}
        />
      </div>
    );
  }
}

export default App;