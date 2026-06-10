export type ProjectType = {
  _id?: string
  coverImg: string
  coverImgPublicId?: string
  name: string
  description?: string
  creator?: {
    firstName: string
    lastName: string
    picture: string
    picturePublicId?: string
    school: string
  }
}
