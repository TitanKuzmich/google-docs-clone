import React, {useState} from 'react'
import dayjs from "dayjs"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {useAuthState} from "react-firebase-hooks/auth"

import {deleteDocument} from "state/dispatchers/document"
import {auth, db} from "lib/firebase"
import Icon from "components/Icon"
import DeleteModal from "components/Modal/DeleteModal"

import style from './style.module.scss'
import icons from "assets/svg"

const Template = ({id, img, title, created, modified}) => {
    const [user] = useAuthState(auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {filter, searchField} = useSelector((state) => state.document)

    const [isDeleteOpen, setDeleteOpen] = useState(false)

    return (
        <>
            {isDeleteOpen && (
                <DeleteModal
                    text={`Are you sure you want to delete '${title}'`}
                    onConfirmAction={() => dispatch(deleteDocument(user, id, filter, setDeleteOpen, searchField))}
                    onCloseAction={() => setDeleteOpen(false)}
                />
            )}

            <div className={style.document_item}>

                <div className={style.close_icon__wrapper}>
                    <Icon
                        icon={icons.Close}
                        classIcon={style.close_icon}
                        onClick={() => {
                            setDeleteOpen(true)
                        }}
                    />
                </div>

                <img src={img} alt="template" onClick={() => {
                    navigate(`/edit/${id}`)
                }}/>

                <div className={style.document_info}>
                    <h3 onClick={() => {
                        navigate(`/edit/${id}`)
                    }}>{title}</h3>
                    <div>
                        <span>Created:</span>
                        <span>
                            {dayjs(created?.toDate()).format("MM.DD.YYYY")}, {dayjs(created?.toDate()).format("HH:mm")}
                        </span>
                    </div>
                    <div>
                        <span>Modified:</span>
                        {modified
                            ? (
                                <span>
                                    {dayjs(modified?.toDate()).format("MM.DD.YYYY")}, {dayjs(modified?.toDate()).format("HH:mm")}
                                </span>
                            ) : (
                                <span>-</span>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Template