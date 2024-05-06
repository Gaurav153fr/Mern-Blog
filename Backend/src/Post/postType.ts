import { User } from "../User/userType"

export default interface Post{
    _id:string,
    title:string,
    story:string,
    author:User,
    authorName:string,
    likes:User[],
    label:string[]
}