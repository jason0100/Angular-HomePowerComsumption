import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApplianceService } from '../appliance.service';
import { FloorService } from '../floor.service';
import { KwhService } from '../kwh.service';
import { KwhMeter } from '../kwhMeter';
import { Floor } from '../floor';
import { parse } from 'path';
import { Appliance } from '../appliance';
@Component({
  selector: 'app-appliance-edit',
  templateUrl: './appliance-edit.component.html',
  styleUrls: ['./appliance-edit.component.css']
})
export class ApplianceEditComponent implements OnInit {
    title = "Add New Appliance";

    kwhOrWatt:true;
    result: any;
    submitted = false;
    msg: string;
    ApplianceForm: FormGroup;
    isSuccess: boolean;
    Appliance: Appliance;
    kwhMeters: KwhMeter[];
    floors: Floor[];
    postorput= true;//post
    constructor(private fb: FormBuilder,
        private ApplianceService: ApplianceService,
        private FloorService: FloorService,
        private KwhMeterService: KwhService) {
        this.ApplianceForm = this.fb.group({
            id:[''],
            name: ['', Validators.required],
            watt: ['',],
            kwh: ['',],
            voltage:['',],
            useHrPerMonth: ['', Validators.required],
            description: [''],
            floorId: ['', Validators.required],
            watthourMeterId: ['', Validators.required],
            spec:['',]
        });
    }

    ngOnInit() {
        this.KwhMeterService.get();
        this.FloorService.get();
        this.KwhMeterService.kwhMetersChange.subscribe(k => {
            this.kwhMeters = k;
            console.log(' kwhMeters=' + JSON.stringify(this.kwhMeters));
        });
        this.FloorService.floorsChange.subscribe(f => {
            this.floors = f;
            console.log(' floors=' + JSON.stringify(this.floors));
        });

        this.getId();

    }
    get id() { return this.ApplianceForm.get('id'); }
    get name() { return this.ApplianceForm.get('name'); }
    get watt() { return this.ApplianceForm.get('watt'); }
    get kwh() { return this.ApplianceForm.get('kwh'); }
    get voltage() { return this.ApplianceForm.get('voltage'); }
    get useHrPerMonth() { return this.ApplianceForm.get('useHrPerMonth'); }
    get description() { return this.ApplianceForm.get('description'); }
    get floorId() { return this.ApplianceForm.get('floorId'); }
    get watthourMeterId() { return this.ApplianceForm.get('watthourMeterId'); }
    get spec() { return this.ApplianceForm.get('spec'); }
    
    onReset() {
        this.submitted = false;
        this.ApplianceForm.reset();
        this.title = "Add New Appliance";
        this.postorput = true;
    }

    onSubmit() {
        if (this.postorput) {
            this.submitted = true;
            //console.log('POST:' + JSON.stringify(this.ApplianceForm.value));

            console.log("Before patch");
            this.ApplianceForm.patchValue({
                FloorId: +this.ApplianceForm.get('FloorId').value,
                WatthourMeterId: +this.ApplianceForm.get('WatthourMeterId').value,
            });
            console.log("After patch");
            console.log('POST:' + JSON.stringify(this.ApplianceForm.value));
            /** POST*/
            this.ApplianceService.post(this.ApplianceForm.value);
            this.ApplianceService.postChange.subscribe(result => {
                console.log('result= ' + JSON.stringify(result))
                this.isSuccess = result.isSuccess;
                if (this.isSuccess) {
                    this.onReset();
                    this.msg = "Add Succeed.";
                }
                else {
                    this.msg = result.message;
                }
                console.log("msg=" + this.msg);
            });
            console.log("After Post");
        }
        else {//this.postorput==false
            this.ApplianceService.put(this.ApplianceForm.value);
           
            this.ApplianceService.putChange.subscribe(result => {
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
        this.ApplianceService.getIdChange.subscribe(result => {
         
            this.Appliance = result;
            console.log('applianceEdit Component result= ' + JSON.stringify(result))
            console.log('applianceEdit Component appliance= ' + JSON.stringify(this.Appliance))

            this.ApplianceForm.patchValue({
                id: this.Appliance.id,
                spec: this.Appliance.spec,
                name: this.Appliance.name,
                watt: this.Appliance.watt,
                kwh: this.Appliance.kwh,
                voltage: this.Appliance.voltage,
                useHrPerMonth: this.Appliance.useHrPerMonth,
                description: this.Appliance.description,
                WatthourMeter: this.Appliance.WatthourMeter,
                floorId: this.Appliance.floorId,
                watthourMeterId: this.Appliance.watthourMeterId
            });
            console.log('PUT:' + JSON.stringify(this.ApplianceForm.value));
            this.title = "Edit Appliance";
            this.postorput = false;
        })
    }

    onPut() {

    }
}
