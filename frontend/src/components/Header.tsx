import React from "react";

import { Link } from "react-router-dom";

import WorkIcon from '@mui/icons-material/Work';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';

export const Header: React.FC = () => {

    const local = localStorage.getItem("user");
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div>
            <header className="header">

                <div>
                    <Link to={`/feed/${localUser.id}`} ><img className="facebook-logo" src="/facebook-logo.png"></img></Link>
                </div>

                <div className="input-search-container">
                    <input placeholder=" Search for friends...." className="input-search"/>
                </div>

                <div className="header-icons-container">
                    <div>
                        <Link to={`/feed/${localUser.id}`}><HomeIcon className="header-icons"/></Link>   
                    </div>

                    <div>
                        <Link to={`/friends-list/${localUser.id}`}><PeopleAltIcon className="header-icons"/></Link>   
                    </div>

                    <div>
                        <Link to={`/profile/${localUser.id}`}><AccountCircleIcon className="header-icons"/></Link>   
                    </div>

                    <div>  
                        <Link to={`/messenger/${localUser.id}`}><MessageIcon className="header-icons"/></Link>   
                    </div>

                    <div>
                        <Link to={`/settings/${localUser.id}`}><SettingsIcon className="header-icons"/></Link>   
                    </div>
                </div>
            </header>
        </div>
    )
}