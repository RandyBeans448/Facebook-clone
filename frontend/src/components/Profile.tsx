import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Header } from "./Header";


import axios, {  AxiosResponse, Method} from 'axios';

import config from "../config";

const FormData = require('form-data');

interface AxiosRequestConfig {
    method: Method;
    url: string,
    headers: any,
    data: any
}

export const Profile: React.FC = () => {

    const local = localStorage.getItem("user");
    const localUser = JSON.parse(local || "{}");
 
    const accessToken = localStorage.getItem("jwt");
    const jwt = JSON.parse(accessToken || "{}");

    const api = config.apiBaseUrl + `profile/${localUser.id}`;

    const [ desc, setDesc ] = useState<string>("");
    const [ image, setImage ] = useState<object>({});
    const [ errors, setErrors ] = useState<string[]>([]);

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
          return;
        } else {
            let file = e.target.files[0];
            console.log(file)
            setImage(file)
            console.log(image)
        }
    }

    const postSubmit = async () => {
        
        const formData:any = new FormData();
        formData.append("desc", desc);
        formData.append("image", image)
        console.log(formData, "form data");

        const post = {
            desc: desc,
            image: image
        }

        console.log(post, "posts")

        for (const entry of formData.entries())
            {
                console.log(entry)
            }

            // const options: AxiosRequestConfig = {
            //     method: "POST",
            //     url: api,
            //     headers: { "Content-Type": "multipart/form-data", Authorization: jwt, },
            //     data: formData,
            //   };
            //   console.log(options)
            // const response: AxiosResponse = await axios(options)
            // console.log(response, "res")

        axios
          .post(
            api,
            formData,
            { 
                headers: 
                    {   
                        "Content-Type": "multipart/form-data", 
                        Authorization: jwt, 
                    }
                }
          )
       
          .then((res) => {
            console.log(res, "repsonse")
          })
          .catch((error) => setErrors(error.response.data.error));
      };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postSubmit();
    };

    return (
        <div>
            <Header/>
            <div>
                <div className="profile-top">
                    <div className="profile-background-picture-wrapper">
                        <img className="profile-background-picture"/>
                    </div>
                    <div className="profile-picture-name-container">
                        <div className="profile-picture-wrapper">
                            <img className="profile-picture"/>
                      </div>
                        <div className="profile-name-wrapper">
                            <h3 className="profile-name"> {localUser.firstName} {localUser.lastName} </h3>
                        </div>
                    </div>
                    
                    <div className="profile-line-break"></div>
                        <div className="profile-navigation-bar-wrapper">
                            <ul className="profile-navigation-list">
                                <li className="profile-navigation-list-item">
                                    <Link to={'/'}>Posts</Link>
                                </li>
                                <li className="profile-navigation-list-item">
                                    <Link to={'/'}>About</Link>
                                </li>
                                <li className="profile-navigation-list-item">
                                    <Link to={'/'}>Friends</Link>
                                </li>
                                <li className="profile-navigation-list-item">
                                    <Link to={'/'}>Photos</Link>
                                </li>
                            </ul>
                        </div>
                </div>
                <div className="profile-left-and-right-container">
                <div className="profile-left-side">
                        <div className="profile-picture-container">
                            <ul>
                                <li className="profile-navigation-list-item">
                                    <h3>Photos</h3>
                                </li>
                                <li className="profile-navigation-list-item">
                                    <Link to={'/'}>See all photos</Link>
                                </li>
                            </ul>
                            <div>
                                <ul className="profile-all-pictures">
                                    <li>
                                        <img></img>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="profile-picture-container">
                            <ul>
                                <li className="profile-navigation-list-item">
                                    <h3>Friends</h3>
                                </li>
                                <li className="profile-navigation-list-item">
                                    <Link to={'/'}>See all friends</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                <div className="profile-right-side">
  
                    <div className="profile-post-box-container">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <textarea placeholder=" whats on your mind?" className="profile-post-textarea" onChange={(e) => setDesc(e.target.value)}></textarea>
                        </div>
                        <div className="profile-post-line-break"></div>
                        
                            <div className="upload-btn-wrapper">
                                <button className="btn">Upload a file</button>
                                <input type="file" name="myfile" onChange={onChange} />
                            </div>
                            <div className="upload-btn-wrapper">
                                <button type="submit" className="btn">Post</button>
                            </div>
                        </form>
                     </div>
                     <div>
                        <h3>Posts</h3>
                    </div>
                    <ul>
                        <li></li>
                    </ul>
                </div>
            </div>
                </div>

        </div>
    )
}