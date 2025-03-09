import { Option } from "./option.model";

export interface Question {
    id:number;
    questionText: string;
    researchId: number;
    options:Option[] // researchId burada tanımlandı
}