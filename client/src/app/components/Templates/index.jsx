import React, {useState} from 'react'
import firebase from "firebase/compat"

import Icon from "components/Icon"
import Template from "components/Templates/Template"
import CreateBlankModal from "components/Modal/CreateBlankModal"
import {auth, db} from "lib/firebase"

import style from './style.module.scss'
import icons from "assets/svg"
import images from "assets/img"
import {useAuthState} from "react-firebase-hooks/auth"

const Templates = () => {
    const [user] = useAuthState(auth)

    const [isCreateOpen, setCreateOpen] = useState(false)
    const [name, setName] = useState("")

    const onSubmit = () => {
        if (!name) return

        db.collection('userDocs')
            .doc(user?.email)
            .collection('docs')
            .add({
                title: name,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })

        setName('')
        setCreateOpen(false)
    }

    return (
        <section className={style.template_wrapper}>
            <div className={style.template}>
                {isCreateOpen && (
                    <CreateBlankModal
                        name={name}
                        setName={setName}
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
            </div>
        </section>
    )
}

export default Templates