import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  usersApiData: [],
  usersSelected: [],
  postsApiData: [],
  postsSelected: [],
}

export const postAndUserSlice = createSlice({
  name: 'post&user',
  initialState,
  reducers: {
    setUsersApiData: (state, action) => {
      state.usersApiData = action.payload
    },
    setPostsApiData: (state, action) => {
      state.postsApiData = action.payload
    },
    addUserSelected: (state, action) => {
      state.usersSelected = [...state.usersSelected, action.payload]
    }, addPostSelected: (state, action) => {
      state.postsSelected = [...state.postsSelected, action.payload]
    },
    removeUserItem: (state, action) => {
      state.usersSelected = state.usersSelected.filter(e => e.id !== action.payload.id)
    },
    removePostItem: (state, action) => {
      state.postsSelected = state.postsSelected.filter(e => e.id !== action.payload.id)
    }, clearAllItems: (state) => {
      state.postsSelected = []
      state.usersSelected = []

    }
  },
})

export const { setUsersApiData, setPostsApiData, addUserSelected, addPostSelected, removeUserItem, removePostItem, clearAllItems } = postAndUserSlice.actions

export default postAndUserSlice.reducer