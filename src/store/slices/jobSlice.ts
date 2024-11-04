import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Job, JobState } from '../../../types'
import { getJobById } from '../../network/apis'

export const fetchJobById = createAsyncThunk<Job, string>(
  'jobs/fetchJobById',
  async (jobId) => {
    const response = await getJobById(jobId)
    return response.data
  }
)

const initialState: JobState = {
  job: {},
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
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load this job'
      })
  },
})

export default jobSlice.reducer
