import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App.js';



import Joinin from './component/Join';



const Root = () => {
    return (
        <BrowserRouter>
            <Route exact path='/' component={App} />
            <Route exact path='/join' component={Joinin} />
        </BrowserRouter>
    );
};

export default Root;