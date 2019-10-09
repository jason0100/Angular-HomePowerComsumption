import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { KwhMeter } from '../kwhMeter';
import { Appliance } from '../appliance';

import { FormGroup } from '@angular/forms';
import { KwhService } from '../kwh.service';

//import { of } from 'rxjs/observable/of';
@Component({
  selector: 'app-kwh-meter',
  templateUrl: './kwh-meter.component.html',
  styleUrls: ['./kwh-meter.component.css']
})
export class KwhMeterComponent implements OnInit {
   
    private kwhApiUrl = "api/KwhMeter";
    kwhMeters: KwhMeter[];
    searchKwhMeterId: number;
    searchKwhMeter: KwhMeter = new KwhMeter();
    searchError: string;
    msg: string;
    isSuccess: boolean;
    constructor(private http: HttpClient,
        @Inject('BASE_URL') baseUrl: string,
        private kwhService: KwhService,
        private el: ElementRef) {

        
  
    }


    ngOnInit(): void {
        this.kwhService.get();
        this.kwhService.kwhMetersChange.subscribe(m => { this.kwhMeters = m });
    }


    deleteMeter(id:number) {
        console.log(id);
        
        this.kwhService.delete(id);
        this.kwhService.deleteChange.subscribe(result => {
            console.log('result= ' + JSON.stringify(result))
            this.isSuccess = result.isSuccess;
            if (this.isSuccess) {

                this.msg = "Delete succeed.";
            }
            else {
                this.msg = result.message;
            }
        });
    }

    editMeter(name:string) {
        console.log(name);
       

        //for (let i = 0; i < this.kwhMeters.length; i++) {
        //    if (this.kwhMeters[i].id == id) {
        //        this.kwhService.edit(this.kwhMeters[i]);
        //        break;
        //    }
        //}
    }
    saveEdit(id:number) {
        console.log(id);
    }

    private focusoutHandler(event) {
        console.log('Focus out');
        console.log('Input Value is ' + event.target.name + event.target.value);

    }

    //getAppliance(id: number) {
    //    if (isNaN(id)) {
    //        return;
    //    }
    //    let url = `${this.kwhApiUrl}/${id}`;
  
    //    this.http.get<any>(url).subscribe(result => {
           
    //            this.searchKwhMeter = <KwhMeter>result;
          
    //    }, error => console.error(error));
    //}
}
