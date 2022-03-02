import { createAction } from "redux-act"

export const newNotificationRequest = createAction("APP_NEW_NOTIFICATION")
export const removeNotificationRequest = createAction("APP_REMOVE_NOTIFICATION")

export const enterDoc = createAction("ENTER_DOC")

export const openCreateDoc = createAction("OPEN_CREATE_DOC")
export const closeCreateDoc = createAction("CLOSE_CREATE_DOC")