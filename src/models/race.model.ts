export interface Race {
    key?: string // The ? in the name means its optional 
    name: string;
    country: string;
    startDate: Date;
    winner?: string;
}