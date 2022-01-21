import React from "react";
import { GoogleOutlined } from "@ant-design/icons";
import { auth } from '../firebase';
import firebase from "firebase/app";

const Login = () => {
    return (
        <div id="login-page">
            <div id="login-card">
                <h2> Welcome !</h2>
                <div
                    className="login-button google"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                >
                    <GoogleOutlined /> Sign in with Google.
                </div>
            </div>
        </div>
    );
}

export default Login;