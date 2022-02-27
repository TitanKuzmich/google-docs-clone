import React from 'react'

import Icon from "components/Icon"
import icons from "assets/svg"

import style from './style.module.scss'

const Template = ({id, img, title, date}) => {
    return (
        <div className={style.document_item} onClick={() => {}}>

            <div className={style.close_icon__wrapper}>
                <Icon
                    icon={icons.Close}
                    classIcon={style.close_icon}
                    onClick={() => {}}
                />
            </div>

            <img src={img} alt="template"/>

            <div className={style.document_info}>
                <h3>{title}</h3>
                <h4>{date}</h4>
            </div>
        </div>
    )
}

export default Template