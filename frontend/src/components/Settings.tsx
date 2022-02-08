import React, { useState } from "react";

import { Header } from "./Header";

import config from "../config";

import axios, {  AxiosResponse, Method} from 'axios';

export const Settings: React.FC = () => {

    const local = localStorage.getItem("user");
    const localUser = JSON.parse(local || "{}");
 
    const accessToken = localStorage.getItem("jwt");
    const jwt = JSON.parse(accessToken || "{}");

    console.log(jwt)

    const api = config.apiBaseUrl + `settings/${localUser.id}`;

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

    const updateAvater = async () => {

        const formData:any = new FormData();
        formData.append("image", image);

        for (const entry of formData.entries())
            {
                console.log(entry)
            }


        axios.patch(
          api,
          formData,
          { 
              headers: 
                  {   
                      "Content-Type": "multipart/form-data", 
                      Authorization:'Bearer ' + jwt, 
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
        updateAvater();
    };

    return (
        <div>
            <Header/>
            <form onSubmit={(e) => handleSubmit(e)}>
            <div className="upload-btn-wrapper">
                <button className="btn">Upload a file</button>
                <input type="file" name="myfile" onChange={onChange} />
            </div>
            <div className="upload-btn-wrapper">
                <button type="submit" className="btn">Post</button>
            </div>
            </form>                 
        </div>
    )

    }
