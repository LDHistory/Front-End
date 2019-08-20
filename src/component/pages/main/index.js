import React, { Component } from 'react';
import Main from './main';
import About from './about';
import Board from './board';

class index extends Component {
    state = {
        site : 'about',
    }

    render() {

        const changeAbout = () => {
           this.setState({
               site : 'about',
           })
        }

        const changeBoard = () => {
            this.setState({
                site : 'board',
            })
        }

        return (
            <div>
                <Main changeAbout={changeAbout} changeBoard={changeBoard}>
                    {(this.state.site === 'about') ? <About /> : <Board />}
                </Main>
            </div>
        );
    }
}

export default index;