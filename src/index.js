import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GlobalStyle from "./globalStyle";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <GlobalStyle/>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
