import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAk7QG-Jjb2ZHboLdN3iEUl1pFZ71bsEjI",
  authDomain: "crwn-clothing-db-ad076.firebaseapp.com",
  projectId: "crwn-clothing-db-ad076",
  storageBucket: "crwn-clothing-db-ad076.appspot.com",
  messagingSenderId: "351046318403",
  appId: "1:351046318403:web:889e5efd89ca5169d497f6"
};


const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)


export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return

  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error) {
      console.log('error creating the user',error)
    }
    }   
    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  
  try {
    return await createUserWithEmailAndPassword( auth, email, password )
  } catch (error) {
    throw new Error(error)
  }
}

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  try {
    return await signInWithEmailAndPassword( auth, email, password )
  } catch (error) {
    throw new Error(error)
  }
}