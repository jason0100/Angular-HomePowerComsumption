import { Component, OnInit, ViewChild } from '@angular/core';
import { KwhMeter } from '../kwhMeter';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidator } from '../CustomValidator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KwhService } from '../kwh.service';
import { bindCallback } from 'rxjs';
import { async } from 'q';

@Component({
  selector: 'app-kwh-meter-edit',
  templateUrl: './kwh-meter-edit.component.html',
  styleUrls: ['./kwh-meter-edit.component.css']
})



export class KwhMeterEditComponent implements OnInit {
   
    kwhMeterUrl = "api/KwhMeter";
    result:any;
    submitted = false;
    msg: string;
    kwhForm: FormGroup;
    isSuccess: boolean;
    title = "Add New Meter";
    postorput: boolean;
    kwhMeter: KwhMeter;
    constructor(private fb: FormBuilder, private http: HttpClient, private kwhService: KwhService) {
        this.kwhForm = this.fb.group({
            id:[],
            wattHourMeterName: ['', Validators.required],
            kwh: [0, [Validators.required,Validators.pattern("^[0-9]*$")]]
            //kwh:['',[CustomValidator.numeric]]
        });
    }
    get id() { return this.kwhForm.get('id'); }
    get wattHourMeterName() { return this.kwhForm.get('wattHourMeterName'); }
    get kwh() { return this.kwhForm.get('kwh'); }
    ngOnInit() {
        this.getId();
        this.postorput = true;
  }
    onSubmit() {
        if (this.postorput) {
            this.submitted = true;
            console.log('POST:' + JSON.stringify(this.kwhForm.value));


            /** POST*/
            this.kwhService.post(this.kwhForm.value);
            console.log("kwhService.post(this.kwhForm.value)=" + JSON.stringify(this.kwhForm.value));
            this.kwhService.postChange.subscribe(result => {
                console.log('result= ' + JSON.stringify(result))
                this.isSuccess = result.isSuccess;
                if (this.isSuccess) {

                    this.msg = "Add Succeed.";
                }
                else {
                    this.msg = result.message;
                }
            });
        }
        else {//this.postorput==false
            console.log('PUT:' + JSON.stringify(this.kwhForm.value));
            this.kwhService.put(this.kwhForm.value);

            this.kwhService.putChange.subscribe(result => {
                console.log('result= ' + JSON.stringify(result))
                this.isSuccess = result.isSuccess;
                if (this.isSuccess) {
                    this.onReset();
                    this.msg = "Edit Succeed.";
                }
                else {
                    this.msg = result.message;
                }
                console.log("msg=" + this.msg);
            });
        }
      
       
    }
    getId() {
        this.kwhService.getIdChange.subscribe(result => {

            this.kwhMeter = result;
  
            this.kwhForm.patchValue({
                id: this.kwhMeter.id,
                wattHourMeterName: this.kwhMeter.wattHourMeterName,
                

            });
            console.log('PUT:' + JSON.stringify(this.kwhForm.value));
            this.title = "Edit KwhMeter";
            this.postorput = false;
        })
    }
  

    onReset() {
        this.kwhForm = this.fb.group({
            id: [],
            wattHourMeterName: ['', Validators.required],
            kwh: [0, [Validators.required, Validators.pattern("^[0-9]*$")]]
            //kwh:['',[CustomValidator.numeric]]
        });
        this.submitted = false;
        //this.kwhForm.reset();
        this.title = "Add New Meter";
        this.postorput = true;
    }
}
