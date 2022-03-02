import React, {useEffect, useRef, useState} from 'react'
import cn from 'classnames'
import {useAuthState} from "react-firebase-hooks/auth"
import {useCollectionOnce} from "react-firebase-hooks/firestore"
import {doc, getDoc} from "firebase/firestore"
import {BallTriangle} from "react-loader-spinner"
import {useDispatch, useSelector} from "react-redux"

import * as actions from "state/actions/app"
import {getDocumentList} from "state/dispatchers/document"

import {auth, db} from "lib/firebase"
import Icon from "components/Icon"
import Document from "components/Documents/Document"
import RadioGroup from "components/Radio/Group"

import style from './style.module.scss'
import icons from "assets/svg"
import images from "assets/img"

const radioGroupItems = [
    {value: "title", label: "Title", order: "asc"},
    {value: "modifiedAt", label: "Last Modified", order: "desc"},
    {value: "createdAt", label: "Created Date", order: "desc"}
]

const Documents = () => {
    const [user] = useAuthState(auth)

    const dispatch = useDispatch()
    const {documents, isLoading, filter, searchField} = useSelector(state => state.document)

    const [isFixed, setFixed] = useState(false)
    const [isSortOpen, setSortOpen] = useState(false)
    const [filterLocal, setFilterLocal] = useState({
        title: radioGroupItems[2].title,
        value: radioGroupItems[2].value,
        order: radioGroupItems[2].order
    })

    const popupRef = useRef(null)

    const onSetFilter = (option) => {
        option.value && setFilterLocal({
            title: option.title,
            value: option.value,
            order: option.order
        })
    }

    const onFixContentHeader = () => {
        window.scrollY > 363 ? setFixed(true) : setFixed(false)
    }

    useEffect(() => {
        filter.value && setFilterLocal(filter)
        window.addEventListener("scroll", onFixContentHeader)
        return () => window.removeEventListener("scroll", onFixContentHeader)
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef?.current && !popupRef?.current.contains(event.target)) {
                event.stopPropagation()
                setSortOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [popupRef])

    useEffect(async () => {
        dispatch(getDocumentList(user, filterLocal, searchField))
    }, [filterLocal])

    if (isLoading) {
        return (
            <div className="app_loading app_loading__documents">
                <div className="app_loading_contents">
                    <img src={images.DocsLogo} alt="logo"/>
                    <BallTriangle
                        color="blue" height={80} width={80}
                    />
                </div>
            </div>
        )
    }

    return (
        <section className={cn(style.document__wrapper)}>
            <div className={cn(style.document)}>

                <div className={cn(style.document_header, {[style.document_header__fixed]: isFixed})}>
                    <h2>My documents</h2>

                    <div className={cn(style.icon_wrapper, {[style.icon_wrapper__open]: isSortOpen})}>
                        <Icon
                            icon={icons.Sort}
                            classIcon={style.sort_icon}
                            onClick={() => setSortOpen(!isSortOpen)}
                        />

                        <div ref={popupRef}>
                            {isSortOpen && (
                                <div className={style.sort_pop_up}>
                                    <RadioGroup
                                        value={filterLocal.value}
                                        onChange={onSetFilter}
                                        items={radioGroupItems}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {!isLoading && !documents?.length ? (
                    <>
                        <div className={style.document_new} onClick={() => dispatch(actions.openCreateDoc())}>
                            <div className={style.document_new__contents}>
                                <img src={images.Plus} alt="new"/>
                                <h2>Create New</h2>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={cn(style.document_content, {[style.document_content__mt]: isFixed})}>
                        {documents.map((item) => (
                            <Document
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                created={item.createdAt}
                                modified={item.modifiedAt}
                                img={images.Plus}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Documents