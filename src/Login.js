import React, {Component} from 'react'
import axios from "axios/index";

class Login extends Component {
    constructor(props) {
        super(props);
            this.state = {
                user: JSON.parse(localStorage.getItem("loginUser")),
                username: "",
                password: ""
            }
    }

    login = () => {
        let user = {
            username: this.state.username,
            password: this.state.password
        };
        console.log(user);
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let obj = this;
        axios.post("http://memagram.duckdns.org:8080/user/login", user, config).then(function (response) {
            if (response.data !== null && response.data !== "") {
                console.log(response.data);
                localStorage.setItem("loginUser", JSON.stringify(response.data));
                obj.setState({
                    user: response.data,
                    username: "",
                    password: ""
                });
                window.location = "/home";
            } else {
                document.getElementById("memegramHeader").style.color = "red";
            }

        });
    };

    changePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    changeUsername = (event) => {
        this.setState({
            username: event.target.value
        });
    };


    render() {
        return (
            <div>
                <div className="login">
                    <h1 className="form-title" id="memegramHeader">MemeGram</h1>
                    <div className="login-form">
                        <input type="text" id="username" onChange={this.changeUsername.bind(this)}
                               value={this.state.username} placeholder="Username"/>
                        <input type="password" id="password" onChange={this.changePassword.bind(this)}
                               value={this.state.password} placeholder="Password"/>
                        <input type="button" value="Login" id="login" onClick={this.login}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;