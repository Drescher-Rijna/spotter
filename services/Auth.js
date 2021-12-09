import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { addDoc, collection, doc, setDoc } from "@firebase/firestore";
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