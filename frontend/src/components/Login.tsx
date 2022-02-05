import React, { useContext, useState, useEffect, } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const api = "http://localhost:5000/login";

export const Login: React.FC = () => {

const navigate = useNavigate();

const [email, setEmail] = useState<string>("");
const [pass, setPassword] = useState<string>("");
const [errors, setErrors] = useState([]);

console.log(email)
console.log(pass)
// const { userState, setUserState } = useContext(UserContext);

const submit = () => {
  axios
    .post(
      api,
      { username: email, password: pass },
    //   { withCredentials: true, credentials: "include" }
    )
    .then((res) => {
      localStorage.setItem("jwt", JSON.stringify(res.data.access_token));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate(`/feed/${res.data.user.id}`,)
    //   setUserState(res.data.user);
    // navigate.push({
    //     pathname: `/user/account/${res.data.user._id}`,
    //   });
    
    })
    .catch((error) => setErrors(error.response.data.error));
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('go')
    e.preventDefault();
    submit();
};

    return (
        <div className="login-wrapper">
            <div className="login-innner-wrap">
            <div>
                <h1 className="login-title" >facebook</h1>
            </div>
            <p>{errors}</p>
                <div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <ul className="login-modal-list">
                            <li>
                                <input id="emailAddress" name="emailAddress" placeholder="email address" className="login-input" onChange={(e) => setEmail(e.target.value)}></input>
                            </li>
                            <li>
                                <input id="password" name="password" type="password" placeholder="password" className="login-input" onChange={(e) => setPassword(e.target.value)}></input>
                            </li>
                            <li>
                                <button type="submit" className="login-button"> Login </button>
                            </li>
                            <li className="login-link-wrapper"> 
                                <Link to="/create-account" className="login-create-account-link">Create new account</Link>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>   
    )
}