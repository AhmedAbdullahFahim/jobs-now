import axios from 'axios'
import { endpoints } from './endpoints'

export const getJobs = (cursor: number = 0) => {
  return axios({ url: `${endpoints.jobs}?cursor=${cursor}` })
}

export const getSkillById = (id: string) => {
  return axios({ url: `${endpoints.skill}${id}` })
}
