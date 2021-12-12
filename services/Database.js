import { deleteDoc, doc, setDoc } from "@firebase/firestore";
import { firestore } from "../Firebase";

export async function likePost (id, userID) {
    const postData = {
        liked: true,
        postID: id,
        id: userID
    }

    try {
        await setDoc(doc(firestore, 'posts', id, 'likes', userID), postData);
    } catch (e) {
        console.log(e);
    }
    
}

export async function unlikePost (id, userID) {
    const docRef = doc(firestore, 'posts', id, 'likes', userID)
    
    await deleteDoc(docRef);
    
} 