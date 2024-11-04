export interface NavbarItem {
  href: string
  title: string
}

export interface Endpoints {
  jobs: string
  search: string
  job: string
  skill: string
}

export interface JobAttributes {
  title: string
}

export interface JobRelationships {
  skills: { id: string }[]
}

export interface Job {
  id: string
  type: string
  attributes: JobAttributes
  relationships: JobRelationships
}

export interface SkillRelationships {
  jobs: { id: string }[]
  skills: { id: string }[]
}

export interface Skill {
  id: string
  name: string
  type: string
  importance: string
  level: string
  relationships: SkillRelationships
}

export interface NormalizedJobsState {
  jobs: { [key: string]: Job }
}

export interface NormalizedSkillsState {
  skills: { [id: string]: Skill }
}

export interface SkillsState {
  entities: NormalizedSkillsState
  loading: boolean
  error: string | null
}

export interface JobsState {
  entities: NormalizedJobsState
  cursor: number
  count: number
  loading: boolean
  error: string | null
}

export interface JobState {
  job: Job | {}
  loading: boolean
  error: string | null
}

export interface SearchHistory {
  searchHistory: string[]
}
