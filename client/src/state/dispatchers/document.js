import {db} from "lib/firebase"
import firebase from "firebase/compat"
import * as actions from "state/actions/document"
import {closeCreateDoc} from "state/actions/app"

export const getDocumentList = (user, filter, searchField) => (dispatch) => {
    dispatch(actions.getDocumentListRequest({filter, searchField}))

    const searchTerm = searchField.toLowerCase()
    const strFrontCode = searchTerm.slice(0, searchTerm.length-1)
    const strEndCode = searchTerm.slice(searchTerm.length-1, searchTerm.length)
    const endCode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1)

    const query = db
        .collection('userDocs')
        .doc(user.email)
        .collection('docs')

    // TODO implement full-text search with elasticsearch or agnola
    // searchField ? query
    //         .orderBy('title')
    //         .orderBy(filter.value, filter.order)
    //         .where('title', '>=', searchTerm)
    //         .where('title', '<', endCode)
    //         // .startAt([searchField])
    //         // .endAt([searchField + '\uf8ff'])
    //         // .where('title', ">=", searchField)
    //         // .where('title', "<=", searchField + "\uf8ff")
    //     :
        query
            .orderBy(filter.value, filter.order)
    query
        .get()
        .then((response) => {
            const data = []
            response?.forEach(doc => data.push({...doc.data(), id: doc.id}))

            dispatch(actions.getDocumentListSuccess(data))
        })
        .catch(() => dispatch(actions.getDocumentListFail()))
}

export const createDocument = (name, setName, user, filter, searchField) => (dispatch) => {
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
            dispatch(getDocumentList(user, filter, searchField))
            dispatch(actions.createDocumentSuccess())
        }).catch(() => dispatch(actions.createDocumentFail()))
}

export const deleteDocument = (user, id, filter, setDeleteOpen, searchField) => (dispatch) => {
    dispatch(actions.deleteDocumentRequest())

    db
        .collection('userDocs')
        .doc(user?.email)
        .collection('docs')
        .doc(id)
        .delete()
        .then((response) => {
            dispatch(actions.deleteDocumentSuccess())
            dispatch(getDocumentList(user, filter, searchField))
            setDeleteOpen(false)
        })
        .catch(() => dispatch(actions.deleteDocumentFail()))
}