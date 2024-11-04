import axios from 'axios'
import { endpoints } from './endpoints'

export const getJobs = (cursor: number = 0) => {
  return axios({ url: `${endpoints.jobs}?cursor=${cursor}` })
}

export const getSkillById = (id: string) => {
  return axios({ url: `${endpoints.skill}${id}` })
}

export const searchJobs = (query: string = '') => {
  return axios({ url: `${endpoints.search}?query=${query}` })
}

export const getJobById = (id: string) => {
  return axios({ url: `${endpoints.job}${id}` })
}
