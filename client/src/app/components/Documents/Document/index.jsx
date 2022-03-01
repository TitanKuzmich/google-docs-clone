import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"

import Icon from "components/Icon"
import icons from "assets/svg"
import DeleteModal from "components/Modal/DeleteModal"

import style from './style.module.scss'

const Template = ({id, img, title, date}) => {
    const navigate = useNavigate()
    const [isDeleteOpen, setDeleteOpen] = useState(false)

    return (
        <>
            {isDeleteOpen && (
                <DeleteModal
                    text="Are you sure you want to delete document"
                    onConfirmAction={() => setDeleteOpen(false)}
                    onCloseAction={() => setDeleteOpen(false)}
                />
            )}

            <div className={style.document_item}>

                <div className={style.close_icon__wrapper} onClick={() => {}}>
                    <Icon
                        icon={icons.Close}
                        classIcon={style.close_icon}
                        onClick={() => {
                            setDeleteOpen(true)
                        }}
                    />
                </div>

                <img src={img} alt="template" onClick={() => {navigate(`/edit/${id}`)}}/>

                <div className={style.document_info}>
                    <h3 onClick={() => {navigate(`/edit/${id}`)}}>{title}</h3>
                    <h4>{date?.toDate().toLocaleDateString()}</h4>
                </div>
            </div>
        </>
    )
}

export default Template