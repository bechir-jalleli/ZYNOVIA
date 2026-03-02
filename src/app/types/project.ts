export type ProjectType = {
  _id?: string
  coverImg: string
  name: string
  description?: string
  creator?: {
    firstName: string
    lastName: string
    picture: string
    school: string
  }
}
