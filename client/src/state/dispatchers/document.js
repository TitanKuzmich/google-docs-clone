import nextId from "react-id-generator"

import {db} from "lib/firebase"
import firebase from "firebase/compat"
import * as actions from "state/actions/document"
import {closeCreateDoc} from "state/actions/app"

export const getDocumentList = (user, filter) => (dispatch) => {
    dispatch(actions.getDocumentListRequest(filter))
    db
        .collection('userDocs')
        .doc(user.email)
        .collection('docs')
        .orderBy(filter.value, filter.order)
        .get()
        .then((response) => {
            const data = []
            response?.forEach(doc => data.push({...doc.data(), id: doc.id}))

            dispatch(actions.getDocumentListSuccess(data))
        })
        .catch(() => dispatch(actions.getDocumentListFail()))
}

export const createDocument = (name, setName, user, filter) => (dispatch) => {
    if (!name) return

    dispatch(actions.createDocumentRequest())

    db.collection('userDocs')
        .doc(user?.email)
        .collection('docs')
        .add({
            title: name,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            modifiedAt: null
        })
        .then(() => {
            setName('')
            dispatch(closeCreateDoc())
            dispatch(getDocumentList(user, filter))
            dispatch(actions.createDocumentSuccess())
        }).catch(() => dispatch(actions.createDocumentFail()))
}

export const deleteDocument = (user, id, filter, setDeleteOpen) => (dispatch) => {
    dispatch(actions.deleteDocumentRequest())

    db
        .collection('userDocs')
        .doc(user?.email)
        .collection('docs')
        .doc(id)
        .delete()
        .then((response) => {
            console.log(response)
            dispatch(actions.deleteDocumentSuccess())
            dispatch(getDocumentList(user, filter))
            setDeleteOpen(false)
        })
        .catch(() => dispatch(actions.deleteDocumentFail()))
}