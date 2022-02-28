import React from 'react'
import {useAuthState} from "react-firebase-hooks/auth"

import {auth} from "lib/firebase"
import Icon from "components/Icon"

import style from './style.module.scss'
import images from 'assets/img'
import icons from 'assets/svg'

const Header = () => {
    const [user] = useAuthState(auth)

    return (
        <div className={style.header}>
            <div className={style.header_logo}>
                <img src={images.DocsLogo} alt="logo"/>
                <p>Documents</p>
            </div>

            <div>
                <div className={style.header_input}>
                    <Icon icon={icons.Search} classIcon={style.search_icon}/>
                    <input
                        type="text"
                        placeholder="Search for documents"
                    />
                </div>
            </div>

            <div className={style.header_apps}>
                <div className={style.icon_wrapper}>
                    <Icon icon={icons.Apps} classIcon={style.apps_icon}/>
                </div>

                <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                />
            </div>
        </div>
    )
}

export default Header