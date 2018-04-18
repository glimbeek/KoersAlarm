export interface Stage {
    key?: string; // The ? in the name means its optional 
    race: string;
    name: string;
    startdate: string;
    startroute: string;
    endroute: string;
    length: string;
    type: string;
    winner?: string;
}