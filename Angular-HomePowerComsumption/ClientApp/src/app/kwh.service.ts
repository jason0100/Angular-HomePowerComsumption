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
    result: any;
    kwhMeters: any;


    private kwhApiUrl = "api/KwhMeter";
  
    constructor(private http: HttpClient) { }

    get(): void {

        this.http.get<KwhMeter[]>(this.kwhApiUrl).subscribe(result => {
            this.kwhMeters = result;
            this.kwhMetersChange.emit(this.kwhMeters);
        });
        console.log('service kwhMeters=' + this.kwhMeters);
      
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
        this.http.put
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

                this.get();
            }
            this.deleteChange.emit(this.result);
        });
      
    }

    edit(w: KwhMeter) {

    }

}
