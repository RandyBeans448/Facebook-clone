import React, { useContext, useState, useEffect, } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const api = "http://localhost:5000/create-account";

export const CreateAccount: React.FC = () => {

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [emailAddress, setEmailAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState([]);

    console.log(firstName, lastName, emailAddress, password)

    const submit = () => {
    
        const data = {
            firstName: firstName,
            lastName: lastName,
            username: emailAddress,
            password: password 
            };
  
    
        axios({
          method: "post",
          url: api,
          data: data,
        })
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
        <div className="login-wrapper">
                   <div  className="login-innner-wrap">
            <div>
            <h1 className="create-login-title">create account</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <ul className="login-modal-list">
                    <li>
                        <input onChange={(e) => setFirstName(e.target.value)} placeholder="First name" className="login-input"/>
                    </li>
                    <li>
                        <input onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="login-input"/>
                    </li>
                    <li> 
                        <input onChange={(e) => setEmailAddress(e.target.value)} placeholder="email address" className="login-input"/>
                    </li>
                    <li>
                        <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="login-input"/>
                    </li>
                    <li>
                        <button type="submit" className="login-button"> Create account </button>
                    </li>
                    <li className="login-link-wrapper"> 
                        <Link to="/login" className="login-create-account-link">Back to login</Link>
                    </li>
                </ul>
            </form>
            {/* {errors.map(( error, index ) => { return <p key={index} className="Errors-p">{error}</p>})} */}
        </div>
        </div>
        </div>
 
   
    )
}