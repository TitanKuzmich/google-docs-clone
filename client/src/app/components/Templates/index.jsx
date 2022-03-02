import React, {useState} from 'react'
import firebase from "firebase/compat"
import {useAuthState} from "react-firebase-hooks/auth"
import {useDispatch, useSelector} from "react-redux"

import * as actions from "state/actions/app"
import {createDocument} from "state/dispatchers/document"

import Icon from "components/Icon"
import Template from "components/Templates/Template"
import CreateBlankModal from "components/Modal/CreateBlankModal"
import {auth, db} from "lib/firebase"

import style from './style.module.scss'
import icons from "assets/svg"
import images from "assets/img"

const Templates = () => {
    const [user] = useAuthState(auth)

    const {isCreateDocOpen} = useSelector((state) => state.app)
    const {filter} = useSelector((state) => state.document)
    const dispatch = useDispatch()

    const [name, setName] = useState("")


    return (
        <section className={style.template_wrapper}>
            <div className={style.template}>
                {isCreateDocOpen && (
                    <CreateBlankModal
                        name={name}
                        setName={setName}
                        onConfirmAction={() => dispatch(createDocument(name, setName, user, filter))}
                        onCloseAction={() => dispatch(actions.closeCreateDoc())}
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
                        action={() => dispatch(actions.openCreateDoc())}
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
            </div>
        </section>
    )
}

export default Templates