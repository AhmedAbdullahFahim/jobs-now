import { configureStore } from '@reduxjs/toolkit'
import jobsReducer from './slices/jobsSlice'
import skillsReducer from './slices/skillsSlice'

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    skills: skillsReducer,
  },
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
