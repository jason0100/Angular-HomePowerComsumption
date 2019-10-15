import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appliance } from './appliance';


@Injectable({
  providedIn: 'root'
})
export class ApplianceService {
       
    //@Output() floorsChange: EventEmitter<any> = new EventEmitter();
    @Output() appliancesChange: EventEmitter<any> = new EventEmitter();
    @Output() postChange: EventEmitter<any> = new EventEmitter();
    @Output() deleteChange: EventEmitter<any> = new EventEmitter();
    @Output() getIdChange: EventEmitter<any> = new EventEmitter();
    @Output() putChange: EventEmitter<any> = new EventEmitter();
    result: any;
    Appliances: any;
    appliancesApiUrl = "api/Appliance";
    appliance: any;//getId
  

    constructor(private http: HttpClient) { }

    get(): void {

        this.http.get<Appliance[]>(this.appliancesApiUrl).subscribe(result => {
            this.Appliances = result;
            this.appliancesChange.emit(this.Appliances);
        });
        console.log('service Appliance=' + JSON.stringify(this.Appliances));

    }

    post(body: any) {
        this.http.post<any>(this.appliancesApiUrl, body).subscribe(result => {
            this.result = result;
            console.log("result=" + JSON.stringify(result));
            this.postChange.emit(this.result);
            if (this.result.isSuccess == true) {

                this.get();
            }
        });
    }

    getId(id:number): void {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
               
            })
        };
        if (id == null || isNaN(id)) {
            return;
        }
        const url = `${this.appliancesApiUrl}/${id}`;

        this.http.get<Appliance>(url, httpOptions).subscribe(result => {
            this.appliance = result;
            this.getIdChange.emit(this.appliance);
        });
        console.log('service appliance=' + JSON.stringify(this.appliance));

    }

    put( body: any) {
        console.log('service put body=' + JSON.stringify(body));
    
     
        const url = `${this.appliancesApiUrl}/${body.id}`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                //'Authorization': 'my-auth-token'
            })
        };

        this.http.put<any>(url, body,httpOptions).subscribe(result => {
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
        const url = `${this.appliancesApiUrl}/${id}`;

        this.http.delete(url, httpOptions).subscribe(result => {
            this.result = result;
            if (this.result.isSuccess == true) {

                this.get();
            }
            this.deleteChange.emit(this.result);
        });

        
    }
}
