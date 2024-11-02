export interface NavbarItem {
  href: string
  title: string
}

export interface Endpoints {
  jobs: string
  search: string
  job: string
  skills: string
}

export interface Skill {
  id: string
}

export interface JobAttributes {
  title: string
}

export interface JobRelationships {
  skills: Skill[]
}

export interface Job {
  id: string
  type: string
  attributes: JobAttributes
  relationships: JobRelationships
}

export interface NormalizedJobsState {
  jobs: { [key: string]: Job }
  skills: { [key: string]: Skill }
}
