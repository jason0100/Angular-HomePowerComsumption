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

    constructor(private fb: FormBuilder, private http: HttpClient, private kwhService: KwhService) {
        this.kwhForm = this.fb.group({
            name: ['', Validators.required],
            kwh: [0, [Validators.required,Validators.pattern("^[0-9]*$")]]
            //kwh:['',[CustomValidator.numeric]]
        });
    }

  ngOnInit() {
  }
    onSubmit() {
        this.submitted = true;
        console.log( 'POST:'+this.kwhForm.value);
        

        /** POST*/
        this.kwhService.post(this.kwhForm.value);
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
   
    get name() { return this.kwhForm.get('name'); }
    get kwh() { return this.kwhForm.get('kwh'); }

    onReset() {
        this.submitted = false;
        this.kwhForm.reset();
    }
}
