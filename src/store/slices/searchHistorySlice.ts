import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SearchHistory } from '../../../types'

const initialState: SearchHistory = {
  searchHistory: [],
}

export const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    pushToSearchHistory: (state, action: PayloadAction<string>) => {
      state.searchHistory = [...state.searchHistory, action.payload]
    },
  },
})

export const { pushToSearchHistory } = searchHistorySlice.actions

export default searchHistorySlice.reducer
