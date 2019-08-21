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

  //Main 페이지에 띄울 sub 페이지를 정하기 위해 site 상태값을 조정
  changeBoard = () => {
     this.setState({
         site : 'board',
     })
  }


  componentDidMount() {
    this.handleGetBoard();
  }

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