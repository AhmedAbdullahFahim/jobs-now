import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Sidebar } from '../../../types'

const initialState: Sidebar = {
  list: [],
  title: '',
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSidebarContentList: (state, action: PayloadAction<string[]>) => {
      state.list = action.payload
    },
    setSidebarContentTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
  },
})

export const { setSidebarContentTitle, setSidebarContentList } =
  sidebarSlice.actions

export default sidebarSlice.reducer
