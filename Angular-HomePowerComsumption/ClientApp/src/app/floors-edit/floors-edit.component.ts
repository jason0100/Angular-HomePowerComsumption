import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FloorService } from '../floor.service';

@Component({
  selector: 'app-floors-edit',
  templateUrl: './floors-edit.component.html',
  styleUrls: ['./floors-edit.component.css']
})
export class FloorsEditComponent implements OnInit {
    floorUrl = "api/floor";
    result: any;
    submitted = false;
    msg: string;
    floorForm: FormGroup;
    isSuccess: boolean;
    constructor(private fb: FormBuilder, private floorService: FloorService) {
        this.floorForm = this.fb.group({
            name: ['', Validators.required],
            
        });
    }

  ngOnInit() {
  }
    get name() { return this.floorForm.get('name'); }

    onReset() {
        this.submitted = false;
        this.floorForm.reset();
    }

    onSubmit() {
        this.submitted = true;
        console.log('POST:' + this.floorForm.value);


        /** POST*/
        this.floorService.post(this.floorForm.value);
        this.floorService.postChange.subscribe(result => {
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

}
