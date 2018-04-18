export interface Etappe {
    key?: string // The ? in the name means its optional 
    name: string;
    startdate: Date;
    startroute: string;
    endroute: string;
    length: number;
    type: string;
    winner?: string;
}