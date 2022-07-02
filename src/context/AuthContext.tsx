import { useState , useEffect , createContext } from 'react'
import { auth , db } from '../firebase';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut , onAuthStateChanged, UserCredential } from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore'


type AuthContextType = {
    signUp: (email: any, password: any) => Promise<void>
    signIn: (email: any, password: any) => Promise<UserCredential>
    logOut: () => Promise<void>
    user: any
}


export const userContext = createContext<AuthContextType>({} as AuthContextType)


export const AuthContextProvider = ({ children }: any) => {
    const [user, setUser] = useState({})
    const signUp = (email: any, password: any) => {
        createUserWithEmailAndPassword(auth, email, password)
        return setDoc(doc(db, 'users', email), {
            watchList: [],
        })
    }


    const signIn = (email: any, password: any) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }
 

    //check if user is authenticated after signing in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser)

            return () => {
                unsubscribe()
            }
        })
    }, [])


    return (
        <userContext.Provider value={{ signUp, signIn, logOut, user }}>
            {children}
        </userContext.Provider>
    )
};