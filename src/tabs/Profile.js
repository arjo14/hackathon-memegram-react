import React, {Component} from 'react'
import '../Style/tab.css'
import {Link} from 'react-router-dom'
import axios from "axios/index";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("loginUser"))
        }
    }

    logout = () => {
        localStorage.removeItem("loginUser");
        this.setState({
            user: null
        });
        window.location = "/logout";
    };

    render() {
        if (this.state.user === null) {
            window.location.replace("/logout");
            return (<div/>);
        } else {
            console.log(this.state.user);
            return (
                <div>
                    <div className="tabDiv">
                        <ul>
                            <Link to="/home" className="tabLink">
                                <li className="tabs">
                                    🏠Home
                                </li>
                            </Link>
                            <Link to="/upload" className="tabLink">
                                <li className="tabs">
                                    Upload

                                </li>
                            </Link>
                            <Link to="/profile" className="tabLink">
                                <li className="tabs active">
                                    Profile
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className="container">
                        <div className="mainDiv  fullScreen">
                            <img src={this.state.user.avatarUrl} className="avatarTag"/>
                            <div className="row">
                                <div className="col-25">
                                    <h3>Full Name</h3>
                                </div>
                                <div className="col-75">
                                    <div>
                                        <p>{this.state.user.fullName}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <h3>E-mail</h3>
                                </div>
                                <div>
                                    <div className="col-75">
                                        <p>{this.state.user.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <h3>Gender</h3>
                                </div>
                                <div>
                                    <div className="col-75">
                                        <p>{this.state.user.gender}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <h3>Bio</h3>
                                </div>
                                <div className="col-75">
                                    <div>
                                        <p>{this.state.user.bio}</p>
                                    </div>
                                </div>
                            </div>
                            <button className="button button3" onClick={this.logout}>Log Out</button>
                        </div>
                    </div>
                </div>
            );
        }
    };
};

export default Profile;