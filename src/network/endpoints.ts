import { Endpoints } from '../../types'

const baseUrl: string = 'https://skills-api-zeta.vercel.app/'

export const endpoints: Endpoints = {
  jobs: `${baseUrl}jobs`,
  search: `${baseUrl}`,
  job: `${baseUrl}`,
  skill: `${baseUrl}skill/`,
}
