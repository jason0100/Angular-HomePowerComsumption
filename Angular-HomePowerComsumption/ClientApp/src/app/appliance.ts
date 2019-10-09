import { Floor } from "./floor";

export class Appliance {
    id: number;
    name: string;
   
    watt: number;
    kwh: number;
    voltage: number;
    useHrPerMonth: number;
    description: string;
    Floor: string;
    WatthourMeter: string;
    spec: string;
    watthourMeterId: number;
    floorId: number;
}