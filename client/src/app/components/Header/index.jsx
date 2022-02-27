import React from 'react'

import Icon from "components/Icon"

import style from './style.module.scss'
import images from 'assets/img'
import icons from 'assets/svg'

const Header = () => {
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
                    src="https://sun9-35.userapi.com/impg/HfJILJmnmK331IbsubOngIgPQPFbUqRfp2vGVA/EB2spfMb9vo.jpg?size=1080x1350&quality=96&sign=db2f728a7775bfaec7e4d583a94f1f60&type=album"
                    alt="avatar"/>
            </div>
        </div>
    )
}

export default Header