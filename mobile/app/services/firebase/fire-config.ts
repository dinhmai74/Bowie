import * as firebase from "firebase"

class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: "AIzaSyA3rfuUHnDAv5AbUIXbIUAbeZ6bgRDmPfs",
        authDomain: "bowie-3512e.firebaseapp.com",
        databaseURL: "https://bowie-3512e.firebaseio.com",
        projectId: "bowie-3512e",
      })
    }
  }

  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback)
  }
}

export const firebaseSDK = new FirebaseSDK()
