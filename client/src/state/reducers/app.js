import { createReducer } from "redux-act"

import * as actions from "../actions/app"

const defaultState = {
    notifications: [],
    docId: null,
    isCreateDocOpen: false,
}

const app = createReducer(
    {
        [actions.newNotificationRequest.getType()](state, payload) {
            return {
                ...state,
                notifications: [...state.notifications, payload]
            }
        },
        [actions.removeNotificationRequest.getType()](state, payload) {
            return {
                ...state,
                notifications: state.notifications.filter(notification => notification.uuid !== payload.uuid)
            }
        },
        [actions.enterDoc.getType()](state, payload) {
            return {
                ...state,
                roomId: payload.docId
            }
        },
        [actions.openCreateDoc.getType()](state, payload) {
            return {
                ...state,
                isCreateDocOpen: true
            }
        },
        [actions.closeCreateDoc.getType()](state, payload) {
            return {
                ...state,
                isCreateDocOpen: false
            }
        }
    },
    defaultState
)

export default app