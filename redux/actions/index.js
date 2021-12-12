import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from '@firebase/firestore'
import { auth, firestore } from '../../Firebase'
import { USER_STATE_CHANGE, POSTS_STATE_CHANGE ,USERS_LIKES_STATE_CHANGE, CLEAR_DATA} from '../constants/index'

export function clearData() {
    return ((dispatch) => {
        dispatch({type: CLEAR_DATA})
    })
}

export function fetchUser() {
    return (async (dispatch) => {
        const docRef = doc(firestore, 'users', auth.currentUser.uid);
        await getDoc(docRef).then((snapshot) => {
            if (snapshot.exists) {
                dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
            }
            else {
                console.log('does not exist')
            }
        })
    })
}

export function fetchPosts() {
    return (async(dispatch, getState) => {
        const dbRef = collection(firestore, 'posts');
        if (category) {
            await getDocs(query(dbRef, orderBy("uploadTime"))).then((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data}
                })
                dispatch({ type: POSTS_STATE_CHANGE, posts })
            })
        } else {
            await getDocs(query(dbRef, orderBy("uploadTime"))).then((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data}
                })
                dispatch({ type: POSTS_STATE_CHANGE, posts })
            })
        }
        
    })
}

export function fetchUsersLikes(uid, postId) {
    return ((dispatch, getState) => {
            const docRef = doc(firestore, 'posts', postId, 'likes', auth.currentUser.uid);

            onSnapshot(docRef, (snapshot)=> {
                const postId = snapshot.ZE.path.segments[3];

                let currentUserLike = false;
                if(snapshot.exists){
                    currentUserLike = true;
                }

                dispatch({ type: USERS_LIKES_STATE_CHANGE, postId, currentUserLike })
            })
    })
}