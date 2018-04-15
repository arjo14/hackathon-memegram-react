import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter, Route} from 'react-router-dom'
import './App.css';
import Login from "./Login";
import Home from "./tabs/Home";
import Upload from "./tabs/Upload";
import Profile from "./tabs/Profile";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("loginUser"))
        }
    }

    renderHome = () => {
        return (<div>
            <Home/>
        </div>);
    };

    renderUpload = () => {
        return (<div>
            <Upload/>
        </div>);
    };

    renderProfile = () => {
        return (<div>
            <Profile/>
        </div>);
    };
    renderLogin = () => {
        return (<Login/>);
    };
    render() {
        return (
            <BrowserRouter>
                <div className="App  fullScreen">
                    <Route exact path="/home" component={this.renderHome.bind(this)}/>
                    <Route exact path="/upload" component={this.renderUpload.bind(this)}/>
                    <Route exact path="/profile" component={this.renderProfile.bind(this)}/>
                    <Route exact path="/logout" component={this.renderLogin.bind(this)}/>
                </div>
            </BrowserRouter>);
    }
}

export default App;
/*
return (<div>
    <div>
        <img className="profPic" src={this.state.user.avatarUrl}/>
    </div>
    <input type="button" onClick={this.logout} value="Log Out"/>
</div>);
*/