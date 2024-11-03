import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { normalize, schema } from 'normalizr'
import { Job, NormalizedJobsState } from '../../../types'
import { getJobs } from '../../network/apis'
import { fetchSkillById } from './skillsSlice'

const jobSchema = new schema.Entity('jobs')

export const fetchJobs = createAsyncThunk<
  { entities: NormalizedJobsState; cursor: number; count: number },
  number
>('jobs/fetchJobs', async (cursor: number = 0, { dispatch }) => {
  const response = await getJobs(cursor)
  const normalizedData = normalize(response.data.data.jobs, [jobSchema])
  response.data.data.jobs.forEach((job: Job) => {
    job.relationships.skills.forEach((skillRef) => {
      const skillId = skillRef.id
      dispatch(fetchSkillById(skillId))
    })
  })
  const entities = {
    jobs: normalizedData.entities.jobs || {},
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
  entities: {
    jobs: {},
  },
  cursor: 0,
  count: 0,
  loading: false,
  error: null,
}

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
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

export default jobsSlice.reducer
