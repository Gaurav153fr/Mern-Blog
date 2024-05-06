import Post from "../Post/postType";

export interface User{
    _id:string,
    name:string,
    email:string,
    password:string,
    posts:Post[]
}
