import { Endpoints } from '../../types'

const baseUrl: string = 'https://skills-api-zeta.vercel.app/'

export const endpoints: Endpoints = {
  jobs: `${baseUrl}jobs`,
  search: `${baseUrl}jobs/search`,
  job: `${baseUrl}job/`,
  skill: `${baseUrl}skill/`,
}
