import React, {useEffect, useRef, useState} from 'react'
import cn from 'classnames'
import {useAuthState} from "react-firebase-hooks/auth"
import {useCollectionOnce} from "react-firebase-hooks/firestore"

import {auth, db} from "lib/firebase"
import Icon from "components/Icon"
import Document from "components/Documents/Document"
import RadioGroup from "components/Radio/Group"

import style from './style.module.scss'
import icons from "assets/svg"
import images from "assets/img"

const radioGroupItems = [
    {value: "title", label: "Title"},
    {value: "lastModified", label: "Last Opened"},
    {value: "createdAt", label: "Created Date"}
]

const Documents = () => {
    const [user] = useAuthState(auth)

    const [isFixed, setFixed] = useState(false)
    const [isSortOpen, setSortOpen] = useState(false)
    const [filter, setFilter] = useState(radioGroupItems[2].value)


    const [snapshot] = useCollectionOnce(
        db
            .collection('userDocs')
            .doc(user.email)
            .collection('docs')
            .orderBy(filter, 'desc')
    )

    const popupRef = useRef(null)

    const onSetFilter = (option) => {
        option.value && setFilter(option.value)
    }

    const onFixContentHeader = () => {
        window.scrollY > 363 ? setFixed(true) : setFixed(false)
    }

    useEffect(() => {
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

    return (
        <section className={cn(style.document__wrapper)}>
            <div className={cn(style.document)}>

                <div className={cn(style.document_header, {[style.document_header__fixed]: isFixed})}>
                    <h2>Recent documents</h2>

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
                                        value={filter}
                                        onChange={onSetFilter}
                                        items={radioGroupItems}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={cn(style.document_content, {[style.document_content__mt]: isFixed})}>
                    {/*{docsInfo.map((item) => (*/}
                    {/*    <Document*/}
                    {/*        key={item.id}*/}
                    {/*        id={item.id}*/}
                    {/*        title={item.title}*/}
                    {/*        date={item.date}*/}
                    {/*        img={item.img}*/}
                    {/*    />*/}
                    {/*))}*/}
                    {snapshot?.docs.map((item) => (
                        <Document
                            key={item.id}
                            id={item.id}
                            title={item.data().title}
                            date={item.data().createdAt}
                            img={images.Plus}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Documents