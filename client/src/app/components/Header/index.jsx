import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useAuthState} from "react-firebase-hooks/auth"
import cn from "classnames"

import {getDocumentList} from "state/dispatchers/document"
import config from "lib/config"
import {auth} from "lib/firebase"
import Icon from "components/Icon"

import style from './style.module.scss'
import images from 'assets/img'
import icons from 'assets/svg'

const Header = () => {
    const [user] = useAuthState(auth)
    const dispatch = useDispatch()
    const {filter, searchField} = useSelector(state => state.document)

    const [search, setSearch] = useState("")
    const [isInfoOpen, setInfoOpen] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [timer, setTimer] = useState(0)

    const popupRef = useRef(null)

    const onSearchStart = () => {
        dispatch(getDocumentList(user, filter, search))
    }

    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            setIsTyping(false)
            onSearchStart()
        }
    }

    const handleChange = (e) => {
        if (!isTyping) {
            setIsTyping(true)
        }

        setSearch(e.target.value)
    }

    const onSignOut = async () => {
        await auth.signOut()
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef?.current && !popupRef?.current.contains(event.target)) {
                event.stopPropagation()
                setInfoOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [popupRef])

    useEffect(() => {
        window.clearTimeout(timer)
        if (isTyping) {
            const timeOut = window.setTimeout(() => {
                onSearchStart()
                setIsTyping(false)
            }, config.modifyIdle)

            setTimer(timeOut)
        }
    }, [isTyping])

    useEffect(() => {
        searchField && setSearch(searchField)
    }, [])

    return (
        <div className={style.header}>
            <div className={style.header_logo}>
                <img src={images.DocsLogo} alt="logo"/>
                <p>Documents</p>
            </div>

            <div>
                <div className={style.header_input}>
                    <Icon icon={icons.Search} classIcon={style.search_icon}/>
                    <input
                        type="text"
                        placeholder="Search for documents"
                        value={search}
                        onChange={(e) => handleChange(e)}
                        onKeyPress={e => onKeyPress(e)}
                    />
                </div>
            </div>

            <div className={style.header_apps}>
                <div className={style.icon_wrapper}>
                    <Icon icon={icons.Apps} classIcon={style.apps_icon}/>
                </div>

                <div className={cn(style.header_avatar, {[style.header_avatar__open]: isInfoOpen})}>
                    {user?.photoURL || user?.displayName ?(
                        <img
                            src={user?.photoURL}
                            alt={user?.displayName}
                            onClick={() => setInfoOpen(!isInfoOpen)}
                        />
                    ) : (
                        <div
                            className={style.header_avatar__blank}
                            onClick={() => setInfoOpen(!isInfoOpen)}
                        >
                            {user?.email.slice(0, 2)}
                        </div>
                    )}

                    <div ref={popupRef}>
                        {isInfoOpen && (
                            <div className={style.info_pop_up}>
                                <div className={style.info_pop_up__info}>
                                    <p>{user?.displayName}</p>
                                    <p>{user?.email}</p>
                                </div>
                                <div
                                    className={style.sign_out}
                                    onClick={onSignOut}
                                >
                                    Sign Out
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Header