interface Requirements {
  content: string,
  items: string[],
}

interface Role {
  content: string,
  items:string[],
}

export interface Job {
  id: number,
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

export interface Search {
  keyword: string,
  location: string,
  isFullTime:boolean
}

export interface Switcher {
  isDarkTheme: boolean,
  setIsDarkTheme:React.Dispatch<React.SetStateAction<boolean>>
}