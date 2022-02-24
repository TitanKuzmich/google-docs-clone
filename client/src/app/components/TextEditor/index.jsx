import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import Quill from 'quill'
import {io} from 'socket.io-client'

import style from './style.scss'

const SAVE_INTERVAL = 2000
const TOOLBAR_OPTIONS = [
    [{header: [1, 2, 3, 4, 5, 6, false]}],
    [{font: []}],
    [{list: 'ordered'}, {list: 'bullet'}],
    ['bold', 'italic', 'underline'],
    [{color: []}, {background: []}],
    [{script: 'sub'}, {script: 'super'}],
    [{align: []}],
    ['image', 'blockquote', 'code-block'],
    ['clean']
]

const TextEditor = () => {
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()
    const {id: documentId} = useParams()

    const containerRef = useCallback((container) => {
        if (!container) return

        container.innerHTML = ''
        const editor = document.createElement('div')
        container.append(editor)
        const q = new Quill(editor, {theme: 'snow', modules: {toolbar: TOOLBAR_OPTIONS}})
        q.disable()
        q.setText('Loading...')
        setQuill(q)

        return () => container.innerHTML = ''
    }, [])

    useEffect(() => {
        const s = io('http://localhost:3001')
        setSocket(s)

        return () => s.disconnect()
    }, [])

    useEffect(() => {
        if(socket == null || quill == null) return

        socket.once('load-document', document => {
            quill.setContents(document)
            quill.enable()
        })

        socket.emit('get-document',documentId)
    }, [socket, quill, documentId])

    useEffect(() => {
        if(socket == null || quill == null) return

        const interval = setInterval(()=> {
            socket.emit('save-document', quill.getContents())
        }, SAVE_INTERVAL)

        return () => clearInterval(interval)
    }, [socket, quill])

    useEffect(() => {
        if(socket == null || quill == null) return

        const handler = (delta, oldDelta, source) => {
            if(source !== 'user') return socket.emit('send-changes', delta)
        }

        quill.on('text-change', handler)
        return () => quill.off('text-change', handler)
    }, [socket, quill])

    useEffect(() => {
        if(socket == null || quill == null) return

        const handler = delta => {
            quill.update(delta)
        }

        socket.on('receive-changes', handler)

        return () => socket.off('receive-changes', handler)
    }, [socket, quill])

    return (
        <div ref={containerRef} className={style.editor_container}>

        </div>
    )
}

export default TextEditor