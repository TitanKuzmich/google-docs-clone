import React, {useState} from 'react'

import Icon from "components/Icon"
import Template from "components/Templates/Template"

import style from './style.module.scss'
import icons from "assets/svg"
import images from "assets/img"
import CreateBlankModal from "components/Modal/CreateBlankModal"

const Templates = () => {
    const [isCreateOpen, setCreateOpen] = useState(false)

    const onSubmit = () => {
        setCreateOpen(false)
    }

    return (
        <section className={style.template}>

            {isCreateOpen && (
                <CreateBlankModal
                    onConfirmAction={onSubmit}
                    onCloseAction={() => setCreateOpen(false)}
                />
            )}

            <div className={style.template_header}>
                <h2>Start a new document</h2>

                <div className={style.icon_wrapper}>
                    <Icon icon={icons.Dots} classIcon={style.dots_icon}/>
                </div>
            </div>

            <div className={style.template_content}>

                <Template
                    title="Blank"
                    img={images.Plus}
                    action={() => setCreateOpen(true)}
                />

                <Template
                    title="Project Proposal"
                    subtitle="Topic"
                    img={images.Project}
                    action={() => {
                    }}
                />

                <Template
                    title="Project Proposal"
                    subtitle="Spearmint"
                    img={images.Proposal}
                    action={() => {
                    }}
                />

                <Template
                    title="Meeting Notes"
                    subtitle="Modern Winter"
                    img={images.Notes}
                    action={() => {
                    }}
                />

                <Template
                    title="Newsletter"
                    subtitle="Lively"
                    img={images.Newsletter}
                    action={() => {
                    }}
                />
            </div>
        </section>
    )
}

export default Templates