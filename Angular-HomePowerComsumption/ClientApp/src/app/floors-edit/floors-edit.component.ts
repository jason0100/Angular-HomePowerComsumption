import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FloorService } from '../floor.service';
import { Floor } from '../floor';

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
    postorput: boolean;
    title = "Add New Floor";
    floor: Floor;
    constructor(private fb: FormBuilder, private floorService: FloorService) {
        this.floorForm = this.fb.group({
            id: [],
            floorName: ['', Validators.required],
            
        });
    }
    get floorName() { return this.floorForm.get('floorName'); }
    get id() { return this.floorForm.get('id'); }

    ngOnInit() {
        this.getId();
        this.postorput = true;
  }
   

    onReset() {
        this.submitted = false;
        this.floorForm.reset();
        this.title = "Add New Floor";
        this.postorput = true;
    }

    onSubmit() {
        if (this.postorput) {
            this.submitted = true;
            console.log('POST:' + JSON.stringify(this.floorForm.value));


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
        else {//this.postorput==false
            this.floorService.put(this.floorForm.value);

            this.floorService.putChange.subscribe(result => {
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
        this.floorService.getIdChange.subscribe(result => {

            this.floor = result;
            console.log('floorEdit Component result= ' + JSON.stringify(result))
            console.log('floorEdit Component floor= ' + JSON.stringify(this.floor))

            this.floorForm.patchValue({
                id: this.floor.id,
                floorName: this.floor.floorName,
                
                
            });
            console.log('PUT:' + JSON.stringify(this.floorForm.value));
            this.title = "Edit Floor";
            this.postorput = false;
        })
    }

}
