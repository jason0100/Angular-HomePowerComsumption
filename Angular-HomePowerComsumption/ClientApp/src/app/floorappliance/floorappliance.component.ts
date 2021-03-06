import { Component, OnInit } from '@angular/core';
import { Floor } from '../floor';
import { FloorService } from '../floor.service';
import { KwhMeter } from '../kwhMeter';
import { KwhService } from '../kwh.service';


@Component({
  selector: 'app-floorappliance',
  templateUrl: './floorappliance.component.html',
  styleUrls: ['./floorappliance.component.css']
})
export class FloorapplianceComponent implements OnInit {
    floors: Floor[]=[];
    msg: string;
    isSuccess: boolean;
    meters: KwhMeter[] = [];
    summerBill: number[]=[];
    summerBillCalculation: string[]=[];
    nonSummerBill: number[] = [];
    nonSummerBillCalculation: string[]=[];


    constructor(private floorService: FloorService, private kwhService: KwhService) { }

    ngOnInit() {
       
        
       
        this.callKwhService().then(() => {
            this.kwhService.kwhMetersChange.subscribe(m => {
                console.log("kwhmeter m=" + (m.length));
                this.meters.length = 0;
                this.floors.length = 0;
                for (let i = 0; i < m.length; i++) {
                    const data = new KwhMeter(m[i].id, m[i].wattHourMeterName, m[i].kwh, 0);
                    //console.log('data=' + JSON.stringify(data));
                    this.meters.push(data);
                }
                //this.meters = m;
                //console.log("kwhmeter meters=" + JSON.stringify(this.meters));
                console.log('this.meters.length=' + this.meters.length)
                console.log("callKwhService END!")
               
                this.floorService.floorsChange.subscribe(m => {
                    console.log('Floors is ready!!!!!')
                                   this.floors.length = 0;
                this.floors = m;
               

                this.callcalcuteA().then(()=>this.callcalcuteBill());

                 })
            
            });
            
        })
        
       
    }

    callKwhService = () => {
        console.log('start call kwhservice')
        let promise = new Promise((resolve, reject) => {
            this.kwhService.get();
            resolve();
        })
        console.log("kwh is readdy!!!");
        return promise;
    }

    callcalcuteA = () => {
        console.log('callcalcuteA this.meters.length=' + this.meters.length)
        let promise = new Promise((resolve, reject) => {

            let count = 0;
            for (let i of this.floors) {
                for (let a of i.appliances) {
                    //計算瞬間最大電流以watt為優先
                    if (a.watt != 0) {
                        a.maxA = parseFloat((a.watt / a.voltage).toFixed(1));
                    }
                    else {
                        a.maxA = parseFloat(((a.kwh * 1000 / 30 / 24) / a.voltage).toFixed(1));
                    }
                    if (a.kwh == 0) {//計算每月度數
                        a.kwh = Math.ceil((a.watt * a.useHrPerMonth) / 1000);
                    }
                    for (let m of this.meters) {
                        if (m.id == a.watthourMeterId) {
                            m.maxA = parseFloat((m.maxA + a.maxA).toFixed(1));
                            m.kwh += a.kwh;
                        }
                        //console.log("m.maxA="+m.maxA);
                    }

                }
                count++;
                console.log(count);
            }
            console.log('outside the loop')
            resolve();
        })
        return promise;
    }

    callcalcuteBill = () => {
        console.log('callcalcuteBill this.meters.length=' + this.meters.length)
        //計算帳單
        for (let m = 0; m < this.meters.length; m++) {
            //console.log("this.meters[m].kwh=" + this.meters[m].kwh);
            if (this.meters[m].kwh < 121) {
                this.summerBill.push(this.meters[m].kwh * 1.63);
                this.summerBillCalculation.push(this.meters[m].kwh + "x1.63");
                this.nonSummerBill.push(this.meters[m].kwh * 1.63);
                this.nonSummerBillCalculation.push(this.meters[m].kwh + "x1.63");


            }
            else if (this.meters[m].kwh < 331) {
                this.summerBill.push(120 * 1.63);
                this.summerBillCalculation.push("120x1.63");
                this.summerBill[m] += (this.meters[m].kwh - 120) * 2.38;
                this.summerBillCalculation[m] += ("+" + (this.meters[m].kwh - 120) + "x2.38");
                this.nonSummerBill.push(120 * 1.63);
                this.nonSummerBillCalculation.push("120x1.63");
                this.nonSummerBill[m] += (this.meters[m].kwh - 120) * 2.1;
                this.nonSummerBillCalculation[m] += ("+" + (this.meters[m].kwh - 120) + "x2.1");
                //console.log("this.summerBill["+m+"]=" + this.summerBill[m]);
            }
            else if (this.meters[m].kwh < 501) {
                this.summerBill.push(120 * 1.63);
                this.summerBillCalculation.push("120x1.63");
                this.summerBill[m] += 210 * 2.38;
                this.summerBillCalculation[m] += ("+210x2.38");
                this.summerBill[m] += (this.meters[m].kwh - 330) * 3.52;
                this.summerBillCalculation[m] += ("+" + (this.meters[m].kwh - 330) + "x3.52");
                this.nonSummerBill.push(120 * 1.63);
                this.nonSummerBillCalculation.push("120x1.63");
                this.nonSummerBill[m] += 210 * 2.1;
                this.nonSummerBillCalculation[m] += ("+210x2.1");
                this.nonSummerBill[m] += (this.meters[m].kwh - 330) * 2.89;
                this.nonSummerBillCalculation[m] += ("+" + (this.meters[m].kwh - 330) + "x2.89");

                //console.log("this.summerBill[" + m + "]=" + this.summerBill[m]);
            }
            else if (this.meters[m].kwh < 701) {
                this.summerBill.push(120 * 1.63);
                this.summerBillCalculation.push("120x1.63");
                this.summerBill[m] += 210 * 2.38;
                this.summerBillCalculation[m] += ("+210x2.38");
                this.summerBill[m] += 170 * 3.52;
                this.summerBillCalculation[m] += ("+170x3.52");
                this.summerBill[m] += (this.meters[m].kwh - 500) * 4.8;
                this.summerBillCalculation[m] += ("+" + (this.meters[m].kwh - 500) + "x4.8");
                this.nonSummerBill.push(120 * 1.63);
                this.nonSummerBillCalculation.push("120x1.63");
                this.nonSummerBill[m] += 210 * 2.1;
                this.nonSummerBillCalculation[m] += ("+210x2.1");
                this.nonSummerBill[m] += 170 * 2.89;
                this.nonSummerBillCalculation[m] += ("+170x2.89");
                this.nonSummerBill[m] += (this.meters[m].kwh - 500) * 3.94;
                this.nonSummerBillCalculation[m] += ("+" + (this.meters[m].kwh - 500) + "x3.94");

            }
            else if (this.meters[m].kwh < 1001) {
                this.summerBill.push(120 * 1.63);
                this.summerBillCalculation.push("120x1.63");
                this.summerBill[m] += 210 * 2.38;
                this.summerBillCalculation[m] += ("+210x2.38");
                this.summerBill[m] += 170 * 3.52;
                this.summerBillCalculation[m] += ("+170x3.52");
                this.summerBill[m] += 200 * 4.8;
                this.summerBillCalculation[m] += ("+200x4.8");
                this.summerBill[m] += (this.meters[m].kwh - 700) * 5.66;
                this.summerBillCalculation[m] += ("+" + (this.meters[m].kwh - 700) + "x5.66");
                this.nonSummerBill.push(120 * 1.63);
                this.nonSummerBillCalculation.push("120x1.63");
                this.nonSummerBill[m] += 210 * 2.1;
                this.nonSummerBillCalculation[m] += ("+210x2.1");
                this.nonSummerBill[m] += 170 * 2.89;
                this.nonSummerBillCalculation[m] += ("+170x2.89");
                this.nonSummerBill[m] += 200 * 3.94;
                this.nonSummerBillCalculation[m] += ("+200x3.94");
                this.nonSummerBill[m] += (this.meters[m].kwh - 700) * 4.6;
                this.nonSummerBillCalculation[m] += ("+" + (this.meters[m].kwh - 700) + "x4.6");

            }
            else if (this.meters[m].kwh > 1000) {
                this.summerBill.push(120 * 1.63);
                this.summerBillCalculation.push("120x1.63");
                this.summerBill[m] += 210 * 2.38;
                this.summerBillCalculation[m] += ("+210x2.38");
                this.summerBill[m] += 170 * 3.52;
                this.summerBillCalculation[m] += ("+170x3.52");
                this.summerBill[m] += 200 * 4.8;
                this.summerBillCalculation[m] += ("+200x4.8");
                this.summerBill[m] += 300 * 5.66;
                this.summerBillCalculation[m] += ("+300x5.66");
                this.summerBill[m] += (this.meters[m].kwh - 1000) * 6.41;
                this.summerBillCalculation[m] += ("+" + (this.meters[m].kwh - 1000) + "x6.41");
                this.nonSummerBill.push(120 * 1.63);
                this.nonSummerBillCalculation.push("120x1.63");
                this.nonSummerBill[m] += 210 * 2.1;
                this.nonSummerBillCalculation[m] += ("+210x2.1");
                this.nonSummerBill[m] += 170 * 2.89;
                this.nonSummerBillCalculation[m] += ("+170x2.89");
                this.nonSummerBill[m] += 200 * 3.94;
                this.nonSummerBillCalculation[m] += ("+200x3.94");
                this.nonSummerBill[m] += 300 * 4.6;
                this.nonSummerBillCalculation[m] += ("+300x4.6");
                this.nonSummerBill[m] += (this.meters[m].kwh - 1000) * 5.03;
                this.nonSummerBillCalculation[m] += ("+" + (this.meters[m].kwh - 1000) + "x5.03");

            }
            this.summerBill[m] = parseFloat((this.summerBill[m] * 2).toFixed(0));
            this.nonSummerBill[m] = parseFloat((this.nonSummerBill[m] * 2).toFixed(0));
            console.log("summerBill=" + (this.summerBill[0]))
        }
    }
    
}
