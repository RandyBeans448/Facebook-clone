import React from "react";

export const Contacts: React.FC = () => {
    return (
        <div>
            <div>
                <div className="contact-header-wrapper">
                    <p className="contacts-title">Contacts</p>
                        <div className="contact-header-search-wrapper">
                            <input placeholder="search for contacts..." className="contact-header-search"/>
                        </div>
                </div>
            <div>
                {/* <ul className="contacts-list">
                    <li className="contacts-list-item">
                        <img/>
                        <div className="contacts-list-name-wrapper"> 
                            <p>John doe</p>
                        </div>
                       
                    </li>
                </ul> */}
            </div>
            </div>
        </div>
    )
}