import { Question } from "./question.model"

export interface Research{
    id:number
    categoryId:number
    title:string
    description:string
    publishedAt:Date
    publishedBy:number
    status:string
    isFaceToFace:boolean
    isCompleted:boolean
    questions:Question[]
}
