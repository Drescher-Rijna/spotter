import {POSTS_STATE_CHANGE, CLEAR_DATA } from "../constants"

const initialState = {
    feed: [],
    likes: []
}

export const users = (state = initialState, action) => {
    switch (action.type) {
        case POSTS_STATE_CHANGE:
            return {
                ...state,
                feed: action.posts
            }
        case CLEAR_DATA:
            return initialState
        default:
            return state;
    }
}