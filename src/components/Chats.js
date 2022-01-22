import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";


const Chat = () => {
    const didMontRef = useRef(false);
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    console.log(user);

    const handleLogout = async () => {
        await auth.signOut();

        history.push("/");
    }

    const getFile = async (url) => {
        let response = await fetch(url);

        let data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' });
    }

    useEffect(() => {
        if(!didMontRef.current) {
            didMontRef.current = true;
        }
        if(!user || user ===null) {
            history.push("/");
            return;
        }

        axios.get('https://api.chatengine.io/users/me/', {
            method: 'GET',
            url: 'https://api.chatengine.io/users/me/',
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formData = new FormData();
            formData.append('email', user.email);
            formData.append('username', user.email);
            formData.append('secret', user.uid);
            getFile(user.photoURL)
                .then((avatar) => {
                    formData.append('avatar', avatar, avatar.name);
                    axios.post('https://api.chatengine.io/users/', 
                        formData,
                        { 
                            method: 'POST',
                            url: "https://api.chatengine.io/users/",
                            headers: { 
                                "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
                            }
                        }
                    )
                    .then(() => setLoading(false))
                    .catch((err) => console.log('err', err.response))
                })
        })
    }, [user, history]); 

    if(!user || loading) return 'Loading...';

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Chat Application
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine 
                height="calc(100vh -66px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
}

export default Chat;