import firebase from 'firebase/compat'

const firebaseConfig = {
    apiKey: "AIzaSyBlIPFZmL_CS7V-bT792AR4BaYNiNENMYg",
    authDomain: "docs-clone-5f2a9.firebaseapp.com",
    projectId: "docs-clone-5f2a9",
    storageBucket: "docs-clone-5f2a9.appspot.com",
    messagingSenderId: "600843667144",
    appId: "1:600843667144:web:df25085f1b4ecfda2ac7fd"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, db, provider}