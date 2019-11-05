import { Component, OnInit, Inject } from '@angular/core';
import { Appliance } from '../appliance';
import { HttpClient } from '@angular/common/http';
import { ApplianceService } from '../appliance.service';

@Component({
  selector: 'app-appliance',
  templateUrl: './appliance.component.html',
  styleUrls: ['./appliance.component.css']
})
export class ApplianceComponent implements OnInit {
    private applianceApiUrl = "api/Appliance";
    apps: Appliance[] = [];  
    msg: string;
    isSuccess: boolean;
    appliances: any;
  
    
    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private applianceService: ApplianceService) {
    
    }



    ngOnInit(): void {
        this.applianceService.get();
        this.applianceService.appliancesChange.subscribe(m => {
            this.appliances = m
            //console.log(' Appliance=' + JSON.stringify(this.appliances));
        });
    }


    deleteAppliance(id: number) {
        if (confirm("Are you sure to delete this item?")) {
            console.log('id=' + id);

            this.applianceService.delete(id);
            this.applianceService.deleteChange.subscribe(result => {
                console.log('result= ' + JSON.stringify(result))
                console.log('result.isSuccess=' + result.isSuccess)
                this.isSuccess = result.isSuccess;
                if (this.isSuccess) {

                    this.msg = "Delete succeed.";
                }
                else {
                    this.msg = result.message;
                }
            });
        }
    }

    editAppliance(id: number) {
       
        this.applianceService.getId(id);
       
    }

    private focusoutHandler(event) {
        console.log('Focus out');
        console.log('Input Value is ' + event.target.name + event.target.value);

    }

}
