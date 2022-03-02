import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import {useDocumentOnce} from "react-firebase-hooks/firestore"
import {useAuthState} from "react-firebase-hooks/auth"
import {Editor} from 'react-draft-wysiwyg'
import {convertToRaw, convertFromRaw} from 'draft-js'
import {EditorState} from "draft-js"
import {auth, db} from "lib/firebase"

import images from "assets/img"
import Icon from "components/Icon"
import icons from "assets/svg"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import style from './style.module.scss'

const TextEditor = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const [user] = useAuthState(auth)
    const [snapshot, loadingSnapshot] = useDocumentOnce(
        db
            .collection('userDocs')
            .doc(user?.email)
            .collection('docs')
            .doc(id)
    )

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)

        console.log(editorState)
        db
            .collection('userDocs')
            .doc(user?.email)
            .collection('docs')
            .doc(id)
            .set({
                editorState: convertToRaw(editorState.getCurrentContent())
            }, {
                merge: true
            })
    }

    useEffect(() => {
        if (snapshot?.data()?.editorState) setEditorState(
            EditorState.createWithContent(convertFromRaw(snapshot?.data()?.editorState)
            ))
    }, [snapshot])

    if (!loadingSnapshot && !snapshot?.data()?.title) navigate('/')

    return (
        <div className={style.editor_wrapper}>
            <div className={style.header}>
                <div className={style.header_logo}>
                    <img src={images.DocsLogo} alt="logo" onClick={() => navigate('/docs')}/>
                    <p>{snapshot?.data()?.title}</p>
                </div>

                <div/>

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

            <div className={style.editor_container}>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    toolbarClassName={style.editor_toolbar}
                    editorClassName={style.editor_page}
                />
            </div>
        </div>
    )

}

export default TextEditor