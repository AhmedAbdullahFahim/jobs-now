import { Endpoints } from '../../types'

const baseUrl: string = 'https://skills-api-zeta.vercel.app/'

export const endpoints: Endpoints = {
  jobs: `${baseUrl}jobs?cursor=0&limit=12`,
  search: `${baseUrl}`,
  job: `${baseUrl}`,
  skills: `${baseUrl}`,
}
