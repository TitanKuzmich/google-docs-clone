import { createAction } from "redux-act"

export const getDocumentListRequest = createAction("GET_DOC_LIST_REQUEST")
export const getDocumentListSuccess = createAction("GET_DOC_LIST_SUCCESS")
export const getDocumentListFail = createAction("GET_DOC_LIST_FAIL")

export const createDocumentRequest = createAction("CREATE_DOC_REQUEST")
export const createDocumentSuccess = createAction("CREATE_DOC_SUCCESS")
export const createDocumentFail = createAction("CREATE_DOC_FAIL")

export const deleteDocumentRequest = createAction("DELETE_DOC_REQUEST")
export const deleteDocumentSuccess = createAction("DELETE_DOC_SUCCESS")
export const deleteDocumentFail = createAction("DELETE_DOC_FAIL")