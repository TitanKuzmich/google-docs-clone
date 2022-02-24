import React, {useCallback, useEffect, useRef} from 'react'
import Quill from 'quill'

import style from './style.scss'

const TOOLBAR_OPTIONS = [
    [{header: [1,2,3,4,5,6,false]}],
    [{font: []}],
    [{list: 'ordered'}, {list: 'bullet'}],
    ['bold', 'italic', 'underline'],
    [{color: []}, {background: []}],
    [{script: 'sub'}, { script: 'super'}],
    [{align: []}],
    ['image', 'blockquote', 'code-block'],
    ['clean']
]

const TextEditor = () => {
    const containerRef = useCallback((container) => {
        if(!container) return

        container.innerHTML = ''
        const editor = document.createElement('div')
        container.append(editor)
        new Quill(editor, {theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS }})

        return () => container.innerHTML = ''
    }, [])

    return (
        <div ref={containerRef} className={style.editor_container}>

        </div>
    )
}

export default TextEditor