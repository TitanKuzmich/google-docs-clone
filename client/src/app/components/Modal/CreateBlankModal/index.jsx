import React from 'react'

import Modal from "components/Modal"

import style from './style.module.scss'

const CreateBlankModal = ({onConfirmAction, onCloseAction, name, setName}) => {

    const header = () => {
        return (
            <span className={style.modal_header__text}>Create New Document</span>
        )
    }

    const content = () => {
        return (
            <div className={style.modal_content__input}>
                <input
                    placeholder="Enter document name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                />
            </div>
        )
    }

    return (
        <Modal
            onConfirmAction={onConfirmAction}
            onCloseAction={onCloseAction}
            header={header}
            content={content}
        />
    )
}

export default CreateBlankModal