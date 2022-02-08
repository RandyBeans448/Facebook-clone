import React, { useEffect, useState} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Contacts } from "./Contacts";
import axios from "axios";

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

export const MainFeed: React.FC = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [pass, setPassword] = useState<string>("");
    const [errors, setErrors] = useState([]);
    
    const { id } = useParams();

    const api = `http://localhost:5000/feed/${id}`;

    const local = localStorage.getItem("user");
    const localUser = JSON.parse(local || "{}");

    const accessToken = localStorage.getItem("jwt");
    const jwt = JSON.parse(accessToken || "{}");

    useEffect(() => {
        axios
          .get(api, {
            headers: {
              Authorization: 'Bearer ' + jwt,
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
          })
          .then((res) => {
            console.log(res.data)
          });
      }, [id]);

      const submit = () => {
        axios
          .post(
            api,
            { username: email, password: pass },
          //   { withCredentials: true, credentials: "include" }
          )
          .then((res) => {
            console.log(res)
          
          })
          .catch((error) => setErrors(error.response.data.error));
      };
      
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          console.log('go')
          e.preventDefault();
          submit();
      };

      

    return (
        <div>
            <Header/>
            <div className="feed-post-box-container">
                <div>
                    <textarea placeholder=" whats on your mind?" className="feed-post-textarea"></textarea>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="upload-btn-wrapper">
                        <button className="btn">Upload a file</button>
                        <input type="file" name="myfile" />
                    </div>
                    <div className="upload-btn-wrapper">
                        <button className="btn">Post</button>
                    </div>
                </form>
                <div>
                  
                </div>
            </div>
            <div className="contact-container"><Contacts/></div>
        </div>
    )
}