import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Job, JobState } from '../../../types'
import { getJobById } from '../../network/apis'
import { fetchSkillById } from './skillsSlice'
import { RootState } from '..'

export const fetchJobById = createAsyncThunk<Job, string>(
  'jobs/fetchJobById',
  async (jobId, { getState, dispatch }) => {
    const response = await getJobById(jobId)
    const job = response.data.data.job

    job.relationships.skills.forEach((skillRef: { id: string }) => {
      const skillId = skillRef.id
      const { skills } = getState() as RootState
      if (!skills?.entities?.skills?.[skillId]?.name)
        dispatch(fetchSkillById(skillId))
    })

    return {
      id: job.id,
      attributes: job.attributes,
      relationships: job.relationships,
      type: job.type,
    }
  }
)

const initialState: JobState = {
  job: {
    id: '',
    type: '',
    attributes: { title: '' },
    relationships: { skills: [] },
  },
  loading: false,
  error: null,
}

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchJobById.fulfilled, (state, action: PayloadAction<Job>) => {
        state.job = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load this job'
      })
  },
})

export default jobSlice.reducer
