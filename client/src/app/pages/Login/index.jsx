import React from 'react'


import images from "assets/img"
import {auth, provider} from "lib/firebase"

import style from './style.module.scss'

const Login = () => {

    const signIn = () => {
        auth.signInWithPopup(provider).catch((e) => alert(e.message))
    }

    return (
        <div className={style.login_wrapper}>
           <div className={style.login_container}>
               <img src={images.DocsLogo} alt="logo"/>
               <h1>Sign in to the TiSai Docs</h1>
               <p>google-docs-clone.com</p>

               <div
                   className={style.login_submit}
                   onClick={signIn}
               >
                   Sign In
               </div>
           </div>
        </div>
    )
}

export default Login