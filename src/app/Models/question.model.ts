import { Option } from "./option.model";

export interface Question {
    questionText: string;
    researchId: number;
    options:Option[] // researchId burada tanımlandı
}