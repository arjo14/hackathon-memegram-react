import React, {Component} from 'react'
import axios from "axios/index";
import '../Style/tab.css'
import {Link} from 'react-router-dom'

class Home extends Component {
    constructor(props) {
        super(props);
        let data = null;

        this.state = {
            user: JSON.parse(localStorage.getItem("loginUser")),
            backendUrl: "http://memagram.duckdns.org:8080",
            posts: []
        };


        if (JSON.parse(localStorage.getItem("loginUser")) !== null && JSON.parse(localStorage.getItem("loginUser")) !== "") {
            let config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            let obj = this;
            axios.get("http://memagram.duckdns.org:8080/user/feed/" + JSON.parse(localStorage.getItem("loginUser")).id, config).then(function (response) {

                obj.setState({
                    posts: response.data
                });
                console.log(obj.state.posts);
            });
        }
    }

    renderPosts = (item, index) => {
        if (item.fileType === 'IMAGE') {
            return (
                <div key={index} className="mainPostDiv">
                    <div className="newBlock">
                        <div>
                            <div className="uploaderDiv">
                                <img src={item.uploader.avatarUrl} className="uploaderImg"/>
                                <span className="uploaderName">{item.uploader.fullName}</span>
                                <img src="https://cdn2.iconfinder.com/data/icons/ui-web-1/50/ui_web_app-67-512.png"
                                     className="configImg"/>
                            </div>
                            <div className="imageDiv">
                                <embed src={item.url} className="postImage" type=""/>
                            </div>
                            <div className="likeDiv">
                                <img src="https://cdn1.iconfinder.com/data/icons/instagram-ui-colored/48/JD-07-512.png"
                                     className="likeImage"/>
                                <img src="https://cdn2.iconfinder.com/data/icons/snipicons/5000/comment-512.png"
                                     className="likeImage"/>

                            </div>
                            <div className="commentDiv">
                                <div className="likers">
                                    Liked by John Vahanyan,
                                    Ruben Ananyan and 627 others
                                </div>
                                <div className="comment">
                                    <div className="gagikComment">
                                        <span className="nameSpan"> John Vahanyan</span> : Շատ լավնա
                                    </div>
                                    <div className="gagikComment">
                                        <span className="nameSpan"> Gagik Khalatyan</span> : Բա հլը անդրոիդը տենաք
                                    </div>
                                    <div>
                                        <input className="commentInput" placeholder="Add comment"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>);
        } else {
            return (
                <div key={index} className="mainPostDiv">
                    <div className="newBlock">
                        <div>
                            <div className="uploaderDiv">
                                <img src={item.uploader.avatarUrl} className="uploaderImg"/>
                                <span className="uploaderName">{item.uploader.fullName}</span>
                            </div>
                            <div className="imageDiv">
                                <video className="postImage" controls>
                                    <source src={item.url}/>
                                </video>
                            </div>
                            <div className="commentDiv">
                                <img src="https://cdn1.iconfinder.com/data/icons/instagram-ui-colored/48/JD-07-512.png"
                                     className="likeImage"/>
                                <img src="https://cdn2.iconfinder.com/data/icons/snipicons/5000/comment-512.png"
                                     className="likeImage"/>
                            </div>

                        </div>
                    </div>
                </div>);
        }


    };

    render() {
        if (this.state.user === null) {
            window.location.replace("/logout")
        }
        return (
            <div>
                <div className="tabDiv">
                    <ul>
                        <Link to="/home" className="tabLink">
                            <li className="tabs active">
                                🏠Home
                            </li>
                        </Link>
                        <Link to="/upload" className="tabLink">
                            <li className="tabs">
                                Upload
                            </li>
                        </Link>
                        <Link to="/profile" className="tabLink">
                            <li className="tabs">
                                Profile
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="container">
                    {
                        this.state.posts.map(this.renderPosts)
                    }
                </div>
            </div>
        );

    };
}

export default Home;