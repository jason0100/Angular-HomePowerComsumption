import { Component, OnInit } from '@angular/core';
import { Floor } from '../floor';
import { FloorService } from '../floor.service';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {
 
    floors: Floor[];
    msg: string;
    isSuccess: boolean;
    //floors: Floor[] = [
    //    { name: "1F", appliances:undefined
    //        }
    //]
    constructor(private floorService:FloorService) { }

    ngOnInit() {
        this.floorService.get();
        this.floorService.floorsChange.subscribe(m => { this.floors = m });
  }

    deleteFloor(id: number) {
        if (confirm("Are you sure to delete this item?")) { 
            console.log(id);

            this.floorService.delete(id);
            this.floorService.deleteChange.subscribe(result => {
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
    }

    editFloor(id: number) {

        this.floorService.getId(id);

    }
}
