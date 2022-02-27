import React from 'react'

import style from './style.module.scss'

const Template = ({img, title, subtitle, action}) => {
    return (
        <div className={style.template_item} onClick={action}>
            <img src={img} alt="template"/>

            <h3>{title}</h3>
            {subtitle && <h4>{subtitle}</h4>}
        </div>
    )
}

export default Template