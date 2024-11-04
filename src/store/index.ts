import { configureStore } from '@reduxjs/toolkit'
import jobsReducer from './slices/jobsSlice'
import skillsReducer from './slices/skillsSlice'
import searchHistoryReducer from './slices/searchHistorySlice'
import jobReducer from './slices/jobSlice'

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    skills: skillsReducer,
    searchHistory: searchHistoryReducer,
    job: jobReducer,
  },
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
