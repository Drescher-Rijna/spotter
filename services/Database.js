import { arrayRemove, arrayUnion, deleteDoc, doc, FieldValue, setDoc, updateDoc } from "@firebase/firestore";
import { firestore } from "../Firebase";

export async function likePost (id, userID) {
    const postData = {
        liked: true,
        postID: id,
        id: userID
    }

    try {
        await setDoc(doc(firestore, 'posts', id, 'likes', userID), postData);
        await updateDoc(doc(firestore, 'posts', id), {
            likes: arrayUnion(userID)
        })
    } catch (e) {
        console.log(e);
    }
    
}

export async function unlikePost (id, userID) {
    const docRef = doc(firestore, 'posts', id, 'likes', userID)
    
    await deleteDoc(docRef);
    await updateDoc(doc(firestore, 'posts', id), {
        likes: arrayRemove(userID)
    })
    
} 

