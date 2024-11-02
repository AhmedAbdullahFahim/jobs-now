import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { normalize, schema } from 'normalizr'
import { NormalizedJobsState } from '../../../types'
import { getJobs } from '../../network/apis'

const skillSchema = new schema.Entity('skills')
const jobSchema = new schema.Entity('jobs', {
  relationships: {
    skills: [skillSchema],
  },
})

export const fetchJobs = createAsyncThunk<
  { entities: NormalizedJobsState; cursor: number; count: number },
  number
>('jobs/fetchJobs', async (cursor: number = 0) => {
  const response = await getJobs(cursor)
  const normalizedData = normalize(response.data.data.jobs, [jobSchema])
  const entities = {
    jobs: normalizedData.entities.jobs || {},
    skills: normalizedData.entities.skills || {},
  }
  const count = response.data.data.meta.count

  return {
    entities: entities as NormalizedJobsState,
    cursor,
    count,
  }
})

export interface JobsState {
  entities: NormalizedJobsState
  cursor: number
  count: number
  loading: boolean
  error: string | null
}

const initialState: JobsState = {
  entities: { jobs: {}, skills: {} },
  cursor: 0,
  count: 0,
  loading: false,
  error: null,
}

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    resetJobsState: (state) => {
      state.entities = { jobs: {}, skills: {} }
      state.cursor = 0
      state.count = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchJobs.fulfilled,
        (
          state,
          action: PayloadAction<{
            entities: NormalizedJobsState
            cursor: number
            count: number
          }>
        ) => {
          const { entities, cursor, count } = action.payload
          state.loading = false
          state.entities.jobs = { ...state.entities.jobs, ...entities.jobs }
          state.entities.skills = {
            ...state.entities.skills,
            ...entities.skills,
          }
          state.cursor = cursor + 12
          state.count = count
        }
      )
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load jobs'
      })
  },
})

export const { resetJobsState } = jobsSlice.actions
export default jobsSlice.reducer
