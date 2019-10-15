import { Injectable, Output, EventEmitter } from '@angular/core';
import { Floor } from './floor';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
    
    @Output() floorsChange: EventEmitter<any> = new EventEmitter();
    @Output() postChange: EventEmitter<any> = new EventEmitter();
    @Output() putChange: EventEmitter<any> = new EventEmitter();
    @Output() deleteChange: EventEmitter<any> = new EventEmitter();
    @Output() getIdChange: EventEmitter<any> = new EventEmitter();
    result: any;
    floor: Floor;//getId

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

    getId(id: number): void {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',

            })
        };
        if (id == null || isNaN(id)) {
            return;
        }
        const url = `${this.floorApiUrl}/${id}`;

        this.http.get<Floor>(url, httpOptions).subscribe(result => {
            this.floor = result;
            this.getIdChange.emit(this.floor);
        });
        console.log('service appliance=' + JSON.stringify(this.floor));

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

    put(body: any) {
        console.log('service put body=' + JSON.stringify(body));


        const url = `${this.floorApiUrl}/${body.id}`;
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
