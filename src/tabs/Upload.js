import React, {Component} from 'react'
import axios from "axios/index";
import '../Style/tab.css'
import {Link} from 'react-router-dom'


class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: JSON.parse(localStorage.getItem("loginUser")),
            selectedFile: null
        }
    }

    uploadEventHandler = () => {
        if (this.state.selectedFile !== null) {
            let obj = this;
            let config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            axios.post('http://memagram.duckdns.org:8080/post/save/image', obj.state.selectedFile)
                .then(function (response) {
                    console.log(response.data);
                    let post = {
                        "url": response.data,
                        "description": "Pink Guy",
                        "tags": ["18+", "Black"],
                        "fileType": "IMAGE",
                        "uploadDate": "2012-04-23T18:25:43.511Z",
                        "uploader": obj.state.user,
                        "verificationStatus": "Approved"
                    };
                    console.log(post);
                    axios.post("http://memagram.duckdns.org:8080/post/create", post, config.headers).then(function (response) {
                        document.getElementById("uploadBtn").style.background = "green";
                    })
                })
                .then(error => {
                    console.log(error);
                })
        }

    };

    fileChangedHandler = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        this.setState({
            selectedFile: formData
        });

    };


    render() {
        if (this.state.user === null) {
            window.location.replace("/logout");
            return (<div/>);
        } else {
            return (<div>
                    <div className="tabDiv">
                        <ul>
                            <Link to="/home" className="tabLink">
                                <li className="tabs">
                                    🏠Home
                                </li>
                            </Link>
                            <Link to="/home" className="tabLink">
                                <li className="tabs active">
                                    <Link to="/upload" className="tabLink">Upload</Link>
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
                        <div className="uploadSettings">
                            <textarea name="description" id="description" cols="20" rows="10"></textarea>
                            <label htmlFor="">Choose file to upload</label>
                            <input type="file" onChange={this.fileChangedHandler.bind(this)}/>
                            <button className="button button2" id="uploadBtn" onClick={this.uploadEventHandler}>Upload
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
    }

}

export default Upload;