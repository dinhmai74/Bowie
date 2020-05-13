import * as firebase from "firebase"
import _ from "lodash"

interface User {
  email: string
  password: string
  name?: string
}

interface FirebaseResult {
  message: string
  error: boolean
}

class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      // avoid re-initializing
      firebase.initializeApp({
        apiKey: "AIzaSyA3rfuUHnDAv5AbUIXbIUAbeZ6bgRDmPfs",
        authDomain: "bowie-3512e.firebaseapp.com",
        databaseURL: "https://bowie-3512e.firebaseio.com",
        projectId: "bowie-3512e",
      })
    }
  }

  login = async (user: User, successCallback, errCallback): Promise<void> => {
    const { email, password } = user
    await firebase
      .auth()
      .signInWithEmailAndPassword(_.trimStart(_.trimEnd(email)), _.trimStart(_.trimEnd(password)))
      .then(successCallback, errCallback)
  }

  auth = async (): Promise<boolean> => {
    const rs = await firebase.auth().currentUser
    if (rs) return true

    return false
  }

  signOut = async (): Promise<boolean> => {
    await firebase.auth().signOut()
    return true
  }
}

export const firebaseSDK = new FirebaseSDK()
