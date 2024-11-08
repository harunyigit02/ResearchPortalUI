import { Answer } from "./answer.model";

export interface Option {
    id:number;
    questionId: number;
    optionText: string;
    answers:Answer[];
}