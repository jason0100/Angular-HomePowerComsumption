import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { KwhMeter } from './kwhMeter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { promise } from 'protractor';
@Injectable({
  providedIn: 'root'
})

export class KwhService {
    @Output() kwhMetersChange: EventEmitter<any> = new EventEmitter();
    @Output() postChange: EventEmitter<any> = new EventEmitter();
    @Output() deleteChange: EventEmitter<any> = new EventEmitter();
    @Output() getIdChange: EventEmitter<any> = new EventEmitter();
    @Output() putChange: EventEmitter<any> = new EventEmitter();
    result: any;
    kwhMeters: KwhMeter[] = [];
    kwhMeter: KwhMeter;

    private kwhApiUrl = "api/KwhMeter";
  
    constructor(private http: HttpClient) { }

    get(): void {

        this.http.get<KwhMeter[]>(this.kwhApiUrl).subscribe(result => {
            console.log("result=" + JSON.stringify(result));
            this.kwhMeters.length = 0;
            for (let i = 0; i < result.length; i++) {
                const data = new KwhMeter(result[i].id, result[i].wattHourMeterName, result[i].kwh, 0);
                console.log('data=' + JSON.stringify(data));
                this.kwhMeters.push(data);
            }
            
            //this.kwhMeters = result;
            //this.parseData(result);
            this.kwhMetersChange.emit(this.kwhMeters);
            console.log('service kwhMeters=' + JSON.stringify(this.kwhMeters));
        });
   
      
    }
    getId(id: number): void {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',

            })
        };
        if (id == null || isNaN(id)) {
            return;
        }
        const url = `${this.kwhApiUrl}/${id}`;

        this.http.get<KwhMeter>(url, httpOptions).subscribe(result => {
            this.kwhMeter = result;
            this.getIdChange.emit(this.kwhMeter);
        });
        console.log('service appliance=' + JSON.stringify(this.kwhMeter));

    }
   post(body: any){
        this.http.post<any>(this.kwhApiUrl, body).subscribe(result => {
            this.result = result;
            console.log("result=" + JSON.stringify(result));
            this.postChange.emit(this.result);
            if (this.result.isSuccess == true) {
            
                this.get();
            }
        });    
   }
    put(body: any) {
        console.log('service put body=' + JSON.stringify(body));


        const url = `${this.kwhApiUrl}/${body.id}`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                //'Authorization': 'my-auth-token'
            })
        };

        this.http.put<any>(url, body, httpOptions).subscribe(result => {
            this.result = result;
            console.log("result=" + JSON.stringify(result));
            this.putChange.emit(this.result);
            if (this.result.isSuccess == true) {

                this.get();
            }
        });
    }

    delete(id: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                //'Authorization': 'my-auth-token'
            })
        };
        if (id == null || isNaN(id)) {
            return;
        }
        const url = `${this.kwhApiUrl}/${id}`;
        
        this.http.delete(url, httpOptions).subscribe(result => {
            this.result = result;
            if (this.result.isSuccess == true) {
                console.log("kwh service issuccess=" + this.result.isSuccess);
                this.get();
            }
            this.deleteChange.emit(this.result);
        });
      
    }

    edit(w: KwhMeter) {

    }

}
