export class KwhMeter {
    id: number;
    wattHourMeterName: string;
    kwh: number;
    maxA: number;
    constructor(id,wattHourMeterName,kwh, maxA) {
        this.id = id;
        this.wattHourMeterName = wattHourMeterName;
        this.kwh = kwh;
        this.maxA = maxA;
    }
}
