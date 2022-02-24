import { Dispatch } from "redux"
import nextId from "react-id-generator"

import { newNotificationRequest, removeNotificationRequest } from "../actions/app"

// error types: "error" | "success" | "info"

export const newNotification =
    (payload) => (dispatch) => {
        const uuid = nextId()
        const minDuration = payload.message === "{global}" ? 10000 : 4000

        const messageLiveTime = Math.max(minDuration, payload.message.split(" ").length * 0.7 * 1000)

        dispatch(newNotificationRequest({ uuid, type: payload.type, message: payload.message }))

        setTimeout(() => {
            return dispatch(removeNotificationRequest({ uuid }))
        }, messageLiveTime)
    }

export const removeNotification = (payload) => (dispatch) => {
    dispatch(removeNotificationRequest({ uuid: payload.uuid }))
}