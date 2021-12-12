import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "@firebase/auth";
import { collection, doc, setDoc } from "@firebase/firestore";
import { useEffect, useState } from 'react';
import { auth, firestore } from "../Firebase";

export const signUp = async (username, email, password) => {
    let user;
    try{
        const result = await createUserWithEmailAndPassword(auth, email, password)
        user = result.user;
    }catch (e) {
        console.log(e)
    }
        
    const dbRef = collection(firestore, 'users');
    const userData = {
        email: email,
        username: username,
        uid: user.uid
    }

    await setDoc(doc(firestore, 'users', user.uid ), userData);

}

export const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
        console.log(e)
    }
}

export function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
        return unsub;
    }, [])

    return currentUser;
}