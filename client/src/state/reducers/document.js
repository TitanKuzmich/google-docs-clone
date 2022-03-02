import { createReducer } from "redux-act"

import * as actions from "../actions/document"

const defaultState = {
    documents: [],
    filter: {
        value: "",
        title: "",
        order: ""
    },
    isLoading: false,
}

const document = createReducer(
    {
        [actions.getDocumentListRequest.getType()](state, payload) {
            return {
                ...state,
                filter: payload,
                isLoading: true
            }
        },
        [actions.getDocumentListSuccess.getType()](state, payload) {
            return {
                ...state,
                documents: payload,
                isLoading: false
            }
        },
        [actions.getDocumentListFail.getType()](state, payload) {
            return {
                ...state,
                isLoading: false
            }
        }
    },
    defaultState
)

export default document