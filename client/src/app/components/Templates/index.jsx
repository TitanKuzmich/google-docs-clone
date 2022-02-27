import React from 'react'

import Icon from "components/Icon"
import {templatesInfo} from "components/Templates/helper"
import Template from "components/Templates/Template"

import style from './style.module.scss'
import icons from "assets/svg"

const Templates = () => {
    return (
        <section className={style.template}>
            <div className={style.template_header}>
                <h2>Start a new document</h2>

                <div className={style.icon_wrapper}>
                    <Icon icon={icons.Dots} classIcon={style.dots_icon}/>
                </div>
            </div>

            <div className={style.template_content}>
                {templatesInfo.map((item, ind) => (
                    <Template
                        key={`${item.title}_${ind}`}
                        title={item.title}
                        subtitle={item.subtitle}
                        img={item.img}
                        action={item.action}
                    />
                ))}
            </div>
        </section>
    )
}

export default Templates