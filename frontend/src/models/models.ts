interface Requirements {
  content: string,
  items: string[],
}

interface Role {
  content: string,
  items:string[],
}

interface Job {
  id: string,
  company: string,
  logo: string,
  logoBackground: string,
  position: string,
  postedAt: string,
  contract: string,
  location: string,
  website: string,
  apply: string,
  description: string,
  requirements: Requirements,
  role:Role
}

 interface Search {
  keyword: string,
  location: string,
  isFullTime:boolean
}

export type { Job, Search };