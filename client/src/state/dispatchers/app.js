import nextId from "react-id-generator"

import * as actions from "../actions/app"
import {db} from "lib/firebase"
import firebase from "firebase/compat"

// error types: "error" | "success" | "info"

export const newNotification =
    (payload) => (dispatch) => {
        const uuid = nextId()
        const minDuration = payload.message === "{global}" ? 10000 : 4000

        const messageLiveTime = Math.max(minDuration, payload.message.split(" ").length * 0.7 * 1000)

        dispatch(actions.newNotificationRequest({ uuid, type: payload.type, message: payload.message }))

        setTimeout(() => {
            return dispatch(actions.removeNotificationRequest({ uuid }))
        }, messageLiveTime)
    }

export const removeNotification = (payload) => (dispatch) => {
    dispatch(actions.removeNotificationRequest({ uuid: payload.uuid }))
}