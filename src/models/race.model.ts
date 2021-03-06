export interface Race {
    key?: string // The ? in the name means its optional 
    name: string;
    country: string;
    startdate: string;
    image: string;
    introtext: string;
    winner?: string;
}