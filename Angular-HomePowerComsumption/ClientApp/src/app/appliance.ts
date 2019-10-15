import { Floor } from "./floor";

export class Appliance {
    id: number;
    name: string;
   
    watt: number;
    kwh: number;
    voltage: number;
    maxA: number;
    useHrPerMonth: number;
    description: string;
    floorName: string;
    wattHourMeterName: string;
    spec: string;
    watthourMeterId: number;
    floorId: number;
}