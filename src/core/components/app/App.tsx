import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Sample } from '../sample/sample';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

export function App() {
    return (
        <div className="App">
            {/* <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>React</h1>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header> */}
            <Header></Header>
            <Sample></Sample>
            <Footer></Footer>
        </div>
    );
}
