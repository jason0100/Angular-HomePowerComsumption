import { Injectable, Output, EventEmitter } from '@angular/core';
import { Floor } from './floor';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
    
    @Output() floorsChange: EventEmitter<any> = new EventEmitter();
    @Output() postChange: EventEmitter<any> = new EventEmitter();
    @Output() deleteChange: EventEmitter<any> = new EventEmitter();
    result: any;
   

    Floors: any;
    floorApiUrl = "api/floor";
    constructor(private http: HttpClient) { }

    get(): void {

        this.http.get<Floor[]>(this.floorApiUrl).subscribe(result => {
            this.Floors = result;
            this.floorsChange.emit(this.Floors);
        });
        console.log('service Floors=' + JSON.stringify( this.Floors));

    }

    post(body: any) {
        this.http.post<any>(this.floorApiUrl, body).subscribe(result => {
            this.result = result;
            console.log("result=" + JSON.stringify(result));
            this.postChange.emit(this.result);
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
        const url = `${this.floorApiUrl}/${id}`;

        this.http.delete(url, httpOptions).subscribe(result => {
            this.result = result;
            if (this.result.isSuccess == true) {

                this.get();
            }
            this.deleteChange.emit( this.result);
        });

    }
}
